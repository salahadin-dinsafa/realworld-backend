import { MigrationInterface, QueryRunner } from "typeorm";

export class FollowingAndFollower1704735609892 implements MigrationInterface {
    name = 'FollowingAndFollower1704735609892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`following\` (\`usersId_1\` int NOT NULL, \`usersId_2\` int NOT NULL, INDEX \`IDX_8fe11fe954183a8e53c6553190\` (\`usersId_1\`), INDEX \`IDX_3703f3412c5e044b8174aaca31\` (\`usersId_2\`), PRIMARY KEY (\`usersId_1\`, \`usersId_2\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`followed\` (\`usersId_1\` int NOT NULL, \`usersId_2\` int NOT NULL, INDEX \`IDX_14500dc1a88699fce2e4a3c402\` (\`usersId_1\`), INDEX \`IDX_2ec1ac8d28e354ad676806f104\` (\`usersId_2\`), PRIMARY KEY (\`usersId_1\`, \`usersId_2\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`following\` ADD CONSTRAINT \`FK_8fe11fe954183a8e53c6553190c\` FOREIGN KEY (\`usersId_1\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`following\` ADD CONSTRAINT \`FK_3703f3412c5e044b8174aaca311\` FOREIGN KEY (\`usersId_2\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`followed\` ADD CONSTRAINT \`FK_14500dc1a88699fce2e4a3c4020\` FOREIGN KEY (\`usersId_1\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`followed\` ADD CONSTRAINT \`FK_2ec1ac8d28e354ad676806f1048\` FOREIGN KEY (\`usersId_2\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`followed\` DROP FOREIGN KEY \`FK_2ec1ac8d28e354ad676806f1048\``);
        await queryRunner.query(`ALTER TABLE \`followed\` DROP FOREIGN KEY \`FK_14500dc1a88699fce2e4a3c4020\``);
        await queryRunner.query(`ALTER TABLE \`following\` DROP FOREIGN KEY \`FK_3703f3412c5e044b8174aaca311\``);
        await queryRunner.query(`ALTER TABLE \`following\` DROP FOREIGN KEY \`FK_8fe11fe954183a8e53c6553190c\``);
        await queryRunner.query(`DROP INDEX \`IDX_2ec1ac8d28e354ad676806f104\` ON \`followed\``);
        await queryRunner.query(`DROP INDEX \`IDX_14500dc1a88699fce2e4a3c402\` ON \`followed\``);
        await queryRunner.query(`DROP TABLE \`followed\``);
        await queryRunner.query(`DROP INDEX \`IDX_3703f3412c5e044b8174aaca31\` ON \`following\``);
        await queryRunner.query(`DROP INDEX \`IDX_8fe11fe954183a8e53c6553190\` ON \`following\``);
        await queryRunner.query(`DROP TABLE \`following\``);
    }

}
