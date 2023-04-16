import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1681629681208 implements MigrationInterface {
    name = 'Users1681629681208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "mail" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128" UNIQUE ("mail"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
