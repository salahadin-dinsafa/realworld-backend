import {
    BaseEntity, Column, CreateDateColumn,
    Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";

import { UserEntity } from "src/user/entities/user.entity";
import { ArticleEntity } from "./article.entity";

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => UserEntity, userEntity => userEntity.comments)
    author: UserEntity;

    @ManyToOne(() => ArticleEntity, articleArticle => articleArticle.comments)
    article: ArticleEntity;

}