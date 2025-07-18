import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1704633369042 implements MigrationInterface {
    name = 'Seed1704633369042'


    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasUsersTableData = await queryRunner.query(`
            SELECT * FROM users
        `);
        if (hasUsersTableData.length) return;

        await queryRunner.query(`
        INSERT INTO users ("username","email","password","bio") 
        VALUES (
            'ahmed',
            'ahmed@gmail.com',
            '$argon2id$v=19$m=65536,t=3,p=4$rgTLw1bkE2d/um5iG14apg$di1hIzjHooTLBod9pXtAwlBGwEegFeAw5z0mi1NbmF4',
            'We will proceed')
        `);
        await queryRunner.query(`
        INSERT INTO users ("username","email","password","bio") 
        VALUES (
            'mume',
            'mume@gmail.com',
            '$argon2id$v=19$m=65536,t=3,p=4$nj+7V8xjG64+O/+ndtEznQ$YdBgccwzi6LKCnIe7TS0MZJiR63k6t20RiFsGR0gJ00',
            'The one and the only one')
        `);
        await queryRunner.query(`
        INSERT INTO articles ("slug","title","description","body","tagList","authorId") 
        VALUES (
            'how-to-train-you-dragon-seed',
            'how to train you dragon seed',
            'A legend footstep to follow',
            'It is true to explain something to someone..',
            '{react,angular}',
            1)
        `);
        await queryRunner.query(`
        INSERT INTO articles ("slug","title","description","body","tagList","authorId") 
        VALUES (
            'how-to-train-you-dragon-seed-2',
            'how to train you dragon seed two',
            'A legend footstep to follow',
            'It is true to explain something to someone..',
            '{react,angular,nextjs}',
            1)
        `);
        await queryRunner.query(`
        INSERT INTO comments ("body","authorId","articleId") 
        VALUES (
            'of course, it is the right choice to to pick this title',
            1,
            1)
        `);
        await queryRunner.query(`
        INSERT INTO comments ("body","authorId","articleId") 
        VALUES (
            'Excellent choice for you',
            1,
            2)
        `);
        await queryRunner.query(`
        INSERT INTO follower ("usersId_1","usersId_2") 
        VALUES (
            1,
            2)
        `);
        await queryRunner.query(`
        INSERT INTO following ("usersId_1","usersId_2") 
        VALUES (
            2,
            1)
        `);
        await queryRunner.query(`
        INSERT INTO users_likes_articles ("usersId","articlesId") 
        VALUES (
            1,
            2)
        `);
    }

    public async down(_queryRunner: QueryRunner): Promise<void> { }

}
