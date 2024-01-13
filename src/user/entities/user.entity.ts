import { ArticleEntity } from "src/article/entities/article.entity";
import { CommentEntity } from "src/article/entities/comment.entity";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, OneToMany } from "typeorm";



@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: '' })
    bio: string;

    @Column({ nullable: true })
    image: string

    @ManyToMany(() => UserEntity)
    @JoinTable({ name: "follower" })
    follower: UserEntity[];

    @ManyToMany(() => UserEntity)
    @JoinTable({ name: "following" })
    following: UserEntity[];

    @OneToMany(() => ArticleEntity, articleEntity => articleEntity.author, { cascade: true })
    articles: ArticleEntity[];

    @OneToMany(() => CommentEntity, commentEntity => commentEntity.article)
    comments: CommentEntity[];

    @ManyToMany(() => ArticleEntity, articleEntity => articleEntity.likes)
    @JoinTable()
    likes: ArticleEntity[];

}