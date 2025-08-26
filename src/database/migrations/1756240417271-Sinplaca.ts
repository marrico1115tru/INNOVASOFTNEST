import { MigrationInterface, QueryRunner } from "typeorm";

export class Sinplaca1756240417271 implements MigrationInterface {
    name = 'Sinplaca1756240417271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventario" DROP COLUMN "placa_sena"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_46e18103a0ccb078511a3317fd9"`);
        await queryRunner.query(`ALTER TABLE "movimientos" ALTER COLUMN "id_producto_inventario" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario" ALTER COLUMN "stock" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_46e18103a0ccb078511a3317fd9" FOREIGN KEY ("id_producto_inventario") REFERENCES "inventario"("id_producto_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_46e18103a0ccb078511a3317fd9"`);
        await queryRunner.query(`ALTER TABLE "inventario" ALTER COLUMN "stock" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movimientos" ALTER COLUMN "id_producto_inventario" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_46e18103a0ccb078511a3317fd9" FOREIGN KEY ("id_producto_inventario") REFERENCES "inventario"("id_producto_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario" ADD "placa_sena" character varying(100)`);
    }

}
