import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1775591211303 implements MigrationInterface {
    name = 'Init1775591211303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`subscription\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isSubscribed\` tinyint NOT NULL DEFAULT 0, \`subscriptionType\` enum ('lifetime') NULL, \`subscribedAt\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_cc906b4bc892b048f1b654d2aa\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`device_session\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deviceId\` varchar(255) NOT NULL, \`browser\` varchar(255) NULL, \`os\` varchar(255) NULL, \`ipAddress\` varchar(255) NULL, \`userAgent\` varchar(255) NULL, \`lastLoginAt\` datetime NULL, \`isActive\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`profileImage\` varchar(255) NULL, \`companyName\` varchar(255) NULL, \`phoneNumber\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('admin', 'customer') NOT NULL DEFAULT 'customer', \`provider\` enum ('local', 'google') NOT NULL DEFAULT 'local', \`providerId\` varchar(255) NULL, \`resetOtp\` varchar(255) NULL, \`otpExpiry\` datetime NULL, \`currentHashedRefreshToken\` varchar(255) NULL, \`trialStartDate\` datetime NULL, \`trialEndDate\` datetime NULL, \`lastLoginAt\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\` (\`providerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`activity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`content\` text NOT NULL, \`isPremium\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_cc906b4bc892b048f1b654d2aa0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`device_session\` ADD CONSTRAINT \`FK_f4973419a62612ee5bd0a2f0b1f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`device_session\` DROP FOREIGN KEY \`FK_f4973419a62612ee5bd0a2f0b1f\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_cc906b4bc892b048f1b654d2aa0\``);
        await queryRunner.query(`DROP TABLE \`activity\``);
        await queryRunner.query(`DROP INDEX \`IDX_0ad4792ebd254550ad4fdb55d6\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`device_session\``);
        await queryRunner.query(`DROP INDEX \`REL_cc906b4bc892b048f1b654d2aa\` ON \`subscription\``);
        await queryRunner.query(`DROP TABLE \`subscription\``);
    }

}
