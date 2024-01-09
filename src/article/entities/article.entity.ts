import { UserEntity } from "src/user/entities/user.entity";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, Unique } from "typeorm";


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

    @Column()
    body: string;

    @Column('simple-array')
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

}
