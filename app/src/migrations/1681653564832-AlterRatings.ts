import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterRatings1681653564832 implements MigrationInterface {
    name = 'AlterRatings1681653564832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Ratings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer NOT NULL, "post_id" integer NOT NULL, "rating" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "update_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE INDEX "IDX_9651e55958e832b80878865be4" ON "Ratings" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_653c5bdc0e5102d279f839c915" ON "Ratings" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d0e17ba5d038b673303acd9240" ON "Posts" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_d0e17ba5d038b673303acd9240"`);
        await queryRunner.query(`DROP INDEX "IDX_653c5bdc0e5102d279f839c915"`);
        await queryRunner.query(`DROP INDEX "IDX_9651e55958e832b80878865be4"`);
        await queryRunner.query(`DROP TABLE "Ratings"`);
    }

}
