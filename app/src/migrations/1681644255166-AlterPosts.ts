import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPosts1681644255166 implements MigrationInterface {
    name = 'AlterPosts1681644255166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Posts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "user_id" integer NOT NULL, "rating" integer NOT NULL DEFAULT (0), "reading_time" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_Posts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "user_id" integer NOT NULL, "rating" integer NOT NULL DEFAULT (0), "reading_time" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_d0e17ba5d038b673303acd92405" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Posts"("id", "title", "content", "user_id", "rating", "reading_time", "created_at", "update_at") SELECT "id", "title", "content", "user_id", "rating", "reading_time", "created_at", "update_at" FROM "Posts"`);
        await queryRunner.query(`DROP TABLE "Posts"`);
        await queryRunner.query(`ALTER TABLE "temporary_Posts" RENAME TO "Posts"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Posts" RENAME TO "temporary_Posts"`);
        await queryRunner.query(`CREATE TABLE "Posts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "user_id" integer NOT NULL, "rating" integer NOT NULL DEFAULT (0), "reading_time" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "Posts"("id", "title", "content", "user_id", "rating", "reading_time", "created_at", "update_at") SELECT "id", "title", "content", "user_id", "rating", "reading_time", "created_at", "update_at" FROM "temporary_Posts"`);
        await queryRunner.query(`DROP TABLE "temporary_Posts"`);
        await queryRunner.query(`DROP TABLE "Posts"`);
    }

}
