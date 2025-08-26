import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInventarioPlacaSena1756240814227 implements MigrationInterface {
    name = 'AddInventarioPlacaSena1756240814227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventario" ADD "placa_sena" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario" ALTER COLUMN "stock" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventario" ALTER COLUMN "stock" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "inventario" DROP COLUMN "placa_sena"`);
    }

}
