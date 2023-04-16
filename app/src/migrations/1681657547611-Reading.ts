import { MigrationInterface, QueryRunner } from "typeorm";

export class Reading1681657547611 implements MigrationInterface {
    name = 'Reading1681657547611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Readings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "post_id" integer NOT NULL, "reading" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE INDEX "IDX_fdb2050be8de52a37ebf521188" ON "Readings" ("post_id") `);
        await queryRunner.query(`CREATE TABLE "ReadingLogs" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer NOT NULL, "post_id" integer NOT NULL, "uuid" varchar NOT NULL DEFAULT (''), "end_reading" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE INDEX "IDX_ae284d242ba73f52da391c8ff7" ON "ReadingLogs" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c3f9ea1f4e02a60f27a483845a" ON "ReadingLogs" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_88dace131df885d24ea39fffdc" ON "ReadingLogs" ("uuid") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_88dace131df885d24ea39fffdc"`);
        await queryRunner.query(`DROP INDEX "IDX_c3f9ea1f4e02a60f27a483845a"`);
        await queryRunner.query(`DROP INDEX "IDX_ae284d242ba73f52da391c8ff7"`);
        await queryRunner.query(`DROP TABLE "ReadingLogs"`);
        await queryRunner.query(`DROP INDEX "IDX_fdb2050be8de52a37ebf521188"`);
        await queryRunner.query(`DROP TABLE "Readings"`);
    }

}
