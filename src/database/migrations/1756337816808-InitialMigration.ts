import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756337816808 implements MigrationInterface {
    name = 'InitialMigration1756337816808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "opciones" ADD "ruta_backend" character varying(150)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "opciones" DROP COLUMN "ruta_backend"`);
    }

}
