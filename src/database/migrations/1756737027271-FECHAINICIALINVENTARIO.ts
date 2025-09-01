import { MigrationInterface, QueryRunner } from "typeorm";

export class FECHAINICIALINVENTARIO1756737027271 implements MigrationInterface {
    name = 'FECHAINICIALINVENTARIO1756737027271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventario" ADD "fecha_entrada" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario" ADD "fecha_salida" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventario" DROP COLUMN "fecha_salida"`);
        await queryRunner.query(`ALTER TABLE "inventario" DROP COLUMN "fecha_entrada"`);
    }

}
