import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateComment1704825668450 implements MigrationInterface {
    name = 'CreateComment1704825668450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`body\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`authorId\` int NULL, \`articleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4548cc4a409b8651ec75f70e280\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_b0011304ebfcb97f597eae6c31f\` FOREIGN KEY (\`articleId\`) REFERENCES \`articles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_b0011304ebfcb97f597eae6c31f\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4548cc4a409b8651ec75f70e280\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
    }

}
