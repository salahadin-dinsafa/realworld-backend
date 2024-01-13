import { MigrationInterface, QueryRunner } from "typeorm";

export class FavoriteArticle1705158810063 implements MigrationInterface {
    name = 'FavoriteArticle1705158810063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users_likes_articles\` (\`usersId\` int NOT NULL, \`articlesId\` int NOT NULL, INDEX \`IDX_fd397fe5125e6b0aae8175b989\` (\`usersId\`), INDEX \`IDX_0358bd6e0a0ef347915562747f\` (\`articlesId\`), PRIMARY KEY (\`usersId\`, \`articlesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_likes_articles\` ADD CONSTRAINT \`FK_fd397fe5125e6b0aae8175b9893\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_likes_articles\` ADD CONSTRAINT \`FK_0358bd6e0a0ef347915562747f3\` FOREIGN KEY (\`articlesId\`) REFERENCES \`articles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_likes_articles\` DROP FOREIGN KEY \`FK_0358bd6e0a0ef347915562747f3\``);
        await queryRunner.query(`ALTER TABLE \`users_likes_articles\` DROP FOREIGN KEY \`FK_fd397fe5125e6b0aae8175b9893\``);
        await queryRunner.query(`DROP INDEX \`IDX_0358bd6e0a0ef347915562747f\` ON \`users_likes_articles\``);
        await queryRunner.query(`DROP INDEX \`IDX_fd397fe5125e6b0aae8175b989\` ON \`users_likes_articles\``);
        await queryRunner.query(`DROP TABLE \`users_likes_articles\``);
    }

}
