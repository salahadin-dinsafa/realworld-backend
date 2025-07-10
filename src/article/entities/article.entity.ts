import { UserEntity } from "src/user/entities/user.entity";

import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    BaseEntity,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { CommentEntity } from "src/article/entities/comment.entity";


@Entity({ name: "articles", })
export class ArticleEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    slug: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('text')
    body: string;

    @Column({ type: 'simple-array', array: true, default: [] })
    tagList: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('boolean', { default: false })
    favorited: boolean;

    @Column({ default: 0 })
    favoritesCount: number;

    @ManyToOne(() => UserEntity, userEntity => userEntity.articles)
    author: UserEntity;

    @OneToMany(() => CommentEntity, commentEntity => commentEntity.author)
    comments: CommentEntity[];

    @ManyToMany(() => UserEntity, userEntity => userEntity.likes)
    likes: UserEntity[];

}
