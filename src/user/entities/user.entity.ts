import { ArticleEntity } from "src/article/entities/article.entity";
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

    @ManyToMany(() => UserEntity, userEntity => userEntity.following)
    @JoinTable({ name: "following" })
    follower: UserEntity[];

    @ManyToMany(() => UserEntity, userEntity => userEntity.follower)
    @JoinTable({ name: "followed" })
    following: UserEntity[];

    @OneToMany(() => ArticleEntity, articleEntity => articleEntity.author, {cascade: true})
    articles: ArticleEntity[];

}