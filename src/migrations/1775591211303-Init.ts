import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1775591211303 implements MigrationInterface {
    name = 'Init1775591211303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create subscription table
        await queryRunner.query(`
            CREATE TABLE "subscription" (
                "id" SERIAL NOT NULL,
                "isSubscribed" boolean NOT NULL DEFAULT false,
                "subscriptionType" character varying,
                "subscribedAt" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" integer,
                CONSTRAINT "UQ_REL_cc906b4bc892b048f1b654d2aa" UNIQUE ("userId"),
                CONSTRAINT "PK_subscription" PRIMARY KEY ("id")
            )
        `);

        // Create device_session table
        await queryRunner.query(`
            CREATE TABLE "device_session" (
                "id" SERIAL NOT NULL,
                "deviceId" character varying NOT NULL,
                "browser" character varying,
                "os" character varying,
                "ipAddress" character varying,
                "userAgent" character varying,
                "lastLoginAt" TIMESTAMP,
                "isActive" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" integer,
                CONSTRAINT "PK_device_session" PRIMARY KEY ("id")
            )
        `);

        // Create user table
        await queryRunner.query(`
            CREATE TYPE "user_role_enum" AS ENUM ('admin', 'customer');
            CREATE TYPE "user_provider_enum" AS ENUM ('local', 'google');

            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "fullName" character varying NOT NULL,
                "username" character varying NOT NULL,
                "profileImage" character varying,
                "companyName" character varying,
                "phoneNumber" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" "user_role_enum" NOT NULL DEFAULT 'customer',
                "provider" "user_provider_enum" NOT NULL DEFAULT 'local',
                "providerId" character varying,
                "resetOtp" character varying,
                "otpExpiry" TIMESTAMP,
                "currentHashedRefreshToken" character varying,
                "trialStartDate" TIMESTAMP,
                "trialEndDate" TIMESTAMP,
                "lastLoginAt" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_username" UNIQUE ("username"),
                CONSTRAINT "UQ_email" UNIQUE ("email"),
                CONSTRAINT "UQ_providerId" UNIQUE ("providerId"),
                CONSTRAINT "PK_user" PRIMARY KEY ("id")
            )
        `);

        // Create activity table
        await queryRunner.query(`
            CREATE TABLE "activity" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" text NOT NULL,
                "content" text NOT NULL,
                "isPremium" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_activity" PRIMARY KEY ("id")
            )
        `);

        // Foreign keys
        await queryRunner.query(`
            ALTER TABLE "subscription"
            ADD CONSTRAINT "FK_subscription_user"
            FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "device_session"
            ADD CONSTRAINT "FK_device_session_user"
            FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_session" DROP CONSTRAINT "FK_device_session_user"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_subscription_user"`);
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_provider_enum"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "device_session"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
    }

}
