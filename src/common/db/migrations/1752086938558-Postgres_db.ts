import { MigrationInterface, QueryRunner } from "typeorm";

export class PostgresDb1752086938558 implements MigrationInterface {
    name = 'PostgresDb1752086938558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "body" text NOT NULL, "taglist" text array NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "favorited" boolean NOT NULL DEFAULT false, "favoritesCount" integer NOT NULL DEFAULT '0', "authorId" integer, CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" text, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, "articleId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follower" ("usersId_1" integer NOT NULL, "usersId_2" integer NOT NULL, CONSTRAINT "PK_e339300cbabb7e8c0a504ca8de4" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d06f68c5275d6e01f57f99957b" ON "follower" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_96ec0b120466b7b5e8af8f2814" ON "follower" ("usersId_2") `);
        await queryRunner.query(`CREATE TABLE "following" ("usersId_1" integer NOT NULL, "usersId_2" integer NOT NULL, CONSTRAINT "PK_c8a352b167cb16cc11f6a7cc827" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8fe11fe954183a8e53c6553190" ON "following" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_3703f3412c5e044b8174aaca31" ON "following" ("usersId_2") `);
        await queryRunner.query(`CREATE TABLE "users_likes_articles" ("usersId" integer NOT NULL, "articlesId" integer NOT NULL, CONSTRAINT "PK_4c375759991bf043c0524242f6a" PRIMARY KEY ("usersId", "articlesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fd397fe5125e6b0aae8175b989" ON "users_likes_articles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0358bd6e0a0ef347915562747f" ON "users_likes_articles" ("articlesId") `);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4548cc4a409b8651ec75f70e280" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_b0011304ebfcb97f597eae6c31f" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_d06f68c5275d6e01f57f99957be" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_96ec0b120466b7b5e8af8f28140" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_8fe11fe954183a8e53c6553190c" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_3703f3412c5e044b8174aaca311" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_likes_articles" ADD CONSTRAINT "FK_fd397fe5125e6b0aae8175b9893" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_likes_articles" ADD CONSTRAINT "FK_0358bd6e0a0ef347915562747f3" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_likes_articles" DROP CONSTRAINT "FK_0358bd6e0a0ef347915562747f3"`);
        await queryRunner.query(`ALTER TABLE "users_likes_articles" DROP CONSTRAINT "FK_fd397fe5125e6b0aae8175b9893"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_3703f3412c5e044b8174aaca311"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_8fe11fe954183a8e53c6553190c"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_96ec0b120466b7b5e8af8f28140"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_d06f68c5275d6e01f57f99957be"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_b0011304ebfcb97f597eae6c31f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4548cc4a409b8651ec75f70e280"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0358bd6e0a0ef347915562747f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fd397fe5125e6b0aae8175b989"`);
        await queryRunner.query(`DROP TABLE "users_likes_articles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3703f3412c5e044b8174aaca31"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8fe11fe954183a8e53c6553190"`);
        await queryRunner.query(`DROP TABLE "following"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_96ec0b120466b7b5e8af8f2814"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d06f68c5275d6e01f57f99957b"`);
        await queryRunner.query(`DROP TABLE "follower"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
