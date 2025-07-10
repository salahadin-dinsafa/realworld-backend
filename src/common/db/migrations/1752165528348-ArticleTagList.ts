import { MigrationInterface, QueryRunner } from "typeorm";

export class ArticleTagList1752165528348 implements MigrationInterface {
    name = 'ArticleTagList1752165528348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "taglist" TO "tagList"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "tagList" TO "taglist"`);
    }

}
