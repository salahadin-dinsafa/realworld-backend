import {
    Entity,
    Column,
    ManyToOne,
    BaseEntity,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

import { UserEntity } from "src/user/entities/user.entity";
import { ArticleEntity } from "src/article/entities/article.entity";

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