import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1756258560126 implements MigrationInterface {
    name = 'InitialSchema1756258560126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventario" ALTER COLUMN "placa_sena" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventario" ALTER COLUMN "placa_sena" SET NOT NULL`);
    }

}
