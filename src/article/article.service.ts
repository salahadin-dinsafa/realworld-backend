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

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
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


}