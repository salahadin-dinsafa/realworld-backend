import { ForbiddenException, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";

import { ArticleEntity } from "./entities/article.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { ICreateArticle } from "./interface/create-article.interface";
import { IArticle } from "./interface/article.interface";
import { ProfileService } from "src/profile/profile.service";
import { IUpdateArticle } from "./interface/update-article.interface";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
        private readonly profileService: ProfileService,
    ) { }

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
        let article: ArticleEntity =
            await this.articleRepository.findOne({ where: { slug }, relations: ['author'] });
        if (!article)
            throw new NotFoundException('article not found');
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