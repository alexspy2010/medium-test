import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUsers1681642158213 implements MigrationInterface {
    name = 'AlterUsers1681642158213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "mail" varchar NOT NULL, "password" varchar NOT NULL, "rating" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128" UNIQUE ("mail"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "mail", "password") SELECT "id", "mail", "password" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "mail" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128" UNIQUE ("mail"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "mail", "password") SELECT "id", "mail", "password" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
