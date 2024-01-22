import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1704633369042 implements MigrationInterface {
    name = 'Seed1704633369042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO \`articles\` (\`slug\`,\`title\`,\`description\`,\`body\`,\`tagList\`) 
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> { }

}
