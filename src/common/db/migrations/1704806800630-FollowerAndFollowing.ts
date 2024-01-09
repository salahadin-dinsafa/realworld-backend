import { MigrationInterface, QueryRunner } from "typeorm";

export class FollowerAndFollowing1704806800630 implements MigrationInterface {
    name = 'FollowerAndFollowing1704806800630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`follower\` (\`usersId_1\` int NOT NULL, \`usersId_2\` int NOT NULL, INDEX \`IDX_d06f68c5275d6e01f57f99957b\` (\`usersId_1\`), INDEX \`IDX_96ec0b120466b7b5e8af8f2814\` (\`usersId_2\`), PRIMARY KEY (\`usersId_1\`, \`usersId_2\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`following\` (\`usersId_1\` int NOT NULL, \`usersId_2\` int NOT NULL, INDEX \`IDX_8fe11fe954183a8e53c6553190\` (\`usersId_1\`), INDEX \`IDX_3703f3412c5e044b8174aaca31\` (\`usersId_2\`), PRIMARY KEY (\`usersId_1\`, \`usersId_2\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`follower\` ADD CONSTRAINT \`FK_d06f68c5275d6e01f57f99957be\` FOREIGN KEY (\`usersId_1\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`follower\` ADD CONSTRAINT \`FK_96ec0b120466b7b5e8af8f28140\` FOREIGN KEY (\`usersId_2\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`following\` ADD CONSTRAINT \`FK_8fe11fe954183a8e53c6553190c\` FOREIGN KEY (\`usersId_1\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`following\` ADD CONSTRAINT \`FK_3703f3412c5e044b8174aaca311\` FOREIGN KEY (\`usersId_2\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`following\` DROP FOREIGN KEY \`FK_3703f3412c5e044b8174aaca311\``);
        await queryRunner.query(`ALTER TABLE \`following\` DROP FOREIGN KEY \`FK_8fe11fe954183a8e53c6553190c\``);
        await queryRunner.query(`ALTER TABLE \`follower\` DROP FOREIGN KEY \`FK_96ec0b120466b7b5e8af8f28140\``);
        await queryRunner.query(`ALTER TABLE \`follower\` DROP FOREIGN KEY \`FK_d06f68c5275d6e01f57f99957be\``);
        await queryRunner.query(`DROP INDEX \`IDX_3703f3412c5e044b8174aaca31\` ON \`following\``);
        await queryRunner.query(`DROP INDEX \`IDX_8fe11fe954183a8e53c6553190\` ON \`following\``);
        await queryRunner.query(`DROP TABLE \`following\``);
        await queryRunner.query(`DROP INDEX \`IDX_96ec0b120466b7b5e8af8f2814\` ON \`follower\``);
        await queryRunner.query(`DROP INDEX \`IDX_d06f68c5275d6e01f57f99957b\` ON \`follower\``);
        await queryRunner.query(`DROP TABLE \`follower\``);
    }

}
