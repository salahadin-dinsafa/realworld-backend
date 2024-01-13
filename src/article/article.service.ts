import { ForbiddenException, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";

import { ArticleEntity } from "./entities/article.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { ICreateArticle } from "./interface/create-article.interface";
import { IArticle, IArticleEle } from "./interface/article.interface";
import { ProfileService } from "src/profile/profile.service";
import { IUpdateArticle } from "./interface/update-article.interface";
import { IArticles } from "./interface/articles.interface";
import { IFeedPagination } from "./interface/feed-pagination.interface";
import { DataSource } from "typeorm/data-source/DataSource";
import { IComment } from "./interface/comment.interface";
import { IAddComment } from "./interface/add-comment.interface";
import { CommentEntity } from "./entities/comment.entity";
import { IComments } from "./interface/comments.interface";
import { ITag } from "./interface/tag.interface";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        private readonly profileService: ProfileService,
        private readonly datasource: DataSource
    ) { }

    async findBySlug(slug: string): Promise<ArticleEntity> {
        let article: ArticleEntity;
        try {
            article = await this.articleRepository.findOne({ where: { slug }, relations: ['author'] });

        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
        if (!article)
            throw new NotFoundException('article not found');
        return article;
    }

    async create(author: UserEntity, createArticle: ICreateArticle): Promise<IArticle> {
        const titleArray: string[] = createArticle.article.title.toLowerCase().split(' ');
        try {
            const article = await this.articleRepository.save({
                slug: titleArray.join('-'),
                ...createArticle.article,
                author
            })

            return await this.getArticle(article, author);

        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY')
                throw new UnprocessableEntityException('article already exist');
            throw new UnprocessableEntityException(error.message);
        }
    }

    async update(currentUser: UserEntity, slug: string, updateArticle: IUpdateArticle): Promise<IArticle> {

        let article: ArticleEntity = await this.findBySlug(slug);

        if (article.author.id !== currentUser.id)
            throw new ForbiddenException();

        Object.assign(article, updateArticle.article);

        if (updateArticle.article.title) {
            const titleArr: string[] = updateArticle.article.title.toLowerCase().split(' ');
            article.slug = titleArr.join('-');
        }

        try {
            return await this.getArticle(await article.save(), currentUser);
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }

    async delete(currentUser: UserEntity, slug: string): Promise<void> {

        let article: ArticleEntity = await this.findBySlug(slug);

        if (article.author.id !== currentUser.id)
            throw new ForbiddenException()

        try {
            await article.remove();
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }

    async findOne(user: UserEntity, slug: string): Promise<IArticle> {
        let article: ArticleEntity = await this.findBySlug(slug);
        try {
            return await this.getArticle(article, user);
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }

    async feed(currentUser: UserEntity, pagination: IFeedPagination): Promise<IArticles> {
        const { limit, offset } = pagination;
        try {
            let queryBuilder =
                this.datasource
                    .getRepository(ArticleEntity)
                    .createQueryBuilder('article')
                    .leftJoinAndSelect('article.author', 'author')
                    .addOrderBy('article.updatedAt', 'DESC')

            let followingId: number[] =
                (await this.profileService.findByNameWithFollowing(currentUser.username))
                    .following
                    .map(user => user.id);

            queryBuilder.andWhere('author.id IN(:...ids)', { ids: followingId });

            queryBuilder.offset(offset);
            queryBuilder.limit(limit ? limit : 20);

            let result: IArticleEle[] =
                await Promise.all(
                    (await queryBuilder.getMany())
                        .map(async article => ((await this.getArticle(article, currentUser)).article))
                )

            return {
                articles: result,
                articlesCount: result.length
            }


        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }



    // Comment

    async findArticleWithComment(slug: string): Promise<ArticleEntity> {
        let article: ArticleEntity;

        try {
            article = await this.articleRepository.findOne({ where: { slug }, relations: ['comments'] })
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }

        if (!article) throw new NotFoundException('article not found');

        return article;
    }

    async addComment(author: UserEntity, slug: string, addComment: IAddComment): Promise<IComment> {
        let article: ArticleEntity = await this.findArticleWithComment(slug);
        try {
            const comment: CommentEntity = await this.commentRepository.save({
                ...addComment.comment,
                article,
                author
            })
            return this.getComment(comment, author)
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }



    async findComments(user: UserEntity, slug: string): Promise<IComments> {
        const article: ArticleEntity = await this.findArticleWithComment(slug);
        try {
            return {
                comments: await Promise.all(
                    article.comments.map(
                        async comment => (await this.getComment(comment, user)).comment)
                )
            }
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }

    async removeComment(user: UserEntity, slug: string, id: number): Promise<void> {
        try {
            let comment =
                await this.commentRepository.findOne({ where: { id }, relations: ['article', 'author'] })

            if (!comment)
                throw new NotFoundException('comment not found');
            if (comment.article.slug !== slug)
                throw new NotFoundException('article not found');
            if (comment.author.id !== user.id)
                throw new ForbiddenException();

            await comment.remove();
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }

    //Favorite

    async findArticleWithLikes(slug: string): Promise<ArticleEntity> {
        let article: ArticleEntity =
            await this.articleRepository.findOne({ where: { slug }, relations: ['likes', 'author'] })
        if (!article) throw new NotFoundException('article not found');
        return article;
    }

    async favorite(user: UserEntity, slug: string): Promise<IArticle> {
        let article: ArticleEntity = await this.findArticleWithLikes(slug);
        let currentUser: UserEntity =
            await this.profileService.findByNameWithLikesAndFollowing(user.username);

        const isLikes: boolean = currentUser.likes.findIndex(art => art.id === article.id) !== -1;

        if (isLikes)
            return await this.getArticle(article, currentUser);


        if (!article.favorited)
            article.favorited = true;

        currentUser.likes.push(article);
        article.likes.push(currentUser);
        article.favoritesCount += 1;
        try {
            return this.getArticle(await article.save(), await currentUser.save());
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }

    async unFavorite(user: UserEntity, slug: string): Promise<IArticle> {
        let article: ArticleEntity = await this.findArticleWithLikes(slug);
        let currentUser: UserEntity =
            await this.profileService.findByNameWithLikesAndFollowing(user.username);

        const isLikes: boolean = currentUser.likes.findIndex(art => art.id === article.id) !== -1;

        if (!isLikes)
            return await this.getArticle(article, currentUser);

        currentUser.likes = currentUser.likes.filter(art => art.id !== article.id);
        article.likes = article.likes.filter(us => us.id !== currentUser.id);

        article.favoritesCount -= 1;

        if (article.favoritesCount === 0)
            article.favorited = false;
        try {
            return this.getArticle(await article.save(), await currentUser.save());
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }

    // Tag

    async findTags(): Promise<ITag> {
        let tags: string[] = [];
        (await this.articleRepository.find()).map(article => article.tagList.map(tag => {
            if (!tags.find(t => t === tag))
                tags.push(tag)
        }))

        return {
            tags
        }
    }





    // Helper function

    async getArticle(article: ArticleEntity, currentUser: UserEntity): Promise<IArticle> {
        const user: UserEntity = await this.profileService.findByNameWithFollower(article.author.username);
        return {
            article: {
                slug: article.slug,
                title: article.title,
                description: article.description,
                body: article.description,
                tagList: article.tagList,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt,
                favorited: article.favorited,
                favoritesCount: article.favoritesCount,
                author: this.profileService.getProfile(user, currentUser).profile,
            }
        }
    }


    async getComment(comment: CommentEntity, currentUser: UserEntity): Promise<IComment> {
        const user: UserEntity = await this.profileService.findByNameWithFollower(comment.author?.username);

        delete comment.article;
        return {
            comment: {
                id: comment.id,
                createAt: comment.createdAt,
                updatedAt: comment.updatedAt,
                body: comment.body,
                author: this.profileService.getProfile(user, currentUser).profile
            }
        }
    }


}