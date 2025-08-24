import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1756021240082 implements MigrationInterface {
    name = 'InitialSchema1756021240082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "titulados" ("id" SERIAL NOT NULL, "nombre" character varying(100), CONSTRAINT "PK_9c1fa980093c61f9fe78197e576" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "municipios" ("id" SERIAL NOT NULL, "nombre" character varying(100), "departamento" character varying(100), CONSTRAINT "PK_10d04b4b4e39ba40240b61e919d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "centro_formacion" ("id" SERIAL NOT NULL, "nombre" character varying(100), "ubicacion" character varying(150), "telefono" character varying(20), "email" character varying(100), "id_municipio" integer, CONSTRAINT "PK_e2b21df96ef6b84c45f8d62dbfe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sedes" ("id" SERIAL NOT NULL, "nombre" character varying(100), "ubicacion" character varying(150), "id_centro_formacion" integer, CONSTRAINT "PK_842a6b0ebcf810b57487748b822" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "areas" ("id" SERIAL NOT NULL, "nombre_area" character varying(100), "id_sede" integer, CONSTRAINT "PK_5110493f6342f34c978c084d0d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modulos" ("id" SERIAL NOT NULL, "nombre_modulo" character varying(100) NOT NULL, CONSTRAINT "PK_ba8d97b7acc232a928b1d686c5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "opciones" ("id" SERIAL NOT NULL, "nombre_opcion" character varying(100) NOT NULL, "descripcion" text, "ruta_frontend" character varying(150), "id_modulo" integer, CONSTRAINT "PK_dea3c16bc97a290f52a9428520b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permisos" ("id" SERIAL NOT NULL, "puede_ver" boolean NOT NULL DEFAULT false, "puede_crear" boolean NOT NULL DEFAULT false, "puede_editar" boolean NOT NULL DEFAULT false, "puede_eliminar" boolean NOT NULL DEFAULT false, "id_rol" integer, "id_opcion" integer, CONSTRAINT "PK_3127bd9cfeb13ae76186d0d9b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "nombre_rol" character varying(100) NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "apellido" character varying(100), "cedula" character varying(20), "email" character varying(100), "telefono" character varying(20), "password" character varying(100) NOT NULL, "id_area" integer, "id_ficha_formacion" integer, "id_rol" integer, CONSTRAINT "UQ_d0a04a74cdb68388fa196a5ba51" UNIQUE ("cedula"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fichas_formacion" ("id" SERIAL NOT NULL, "nombre" character varying(100), "id_titulado" integer, "id_usuario_responsable" integer, CONSTRAINT "PK_60d32309193a83858406efb0e94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movimientos" ("id" SERIAL NOT NULL, "tipo_movimiento" character varying(50) NOT NULL, "cantidad" integer NOT NULL, "fecha_movimiento" date NOT NULL, "id_entrega" integer, "id_producto_inventario" integer, CONSTRAINT "PK_519702aa97def3e7c1b6cc5e2f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entrega_material" ("id" SERIAL NOT NULL, "fecha_entrega" date NOT NULL, "observaciones" text, "id_ficha_formacion" integer, "id_solicitud" integer, "id_usuario_responsable" integer, CONSTRAINT "PK_05d96197627a9199981b21e6d15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solicitudes" ("id" SERIAL NOT NULL, "fecha_solicitud" date NOT NULL, "estado_solicitud" character varying(50), "id_usuario_solicitante" integer, CONSTRAINT "PK_8c7e99758c774b801853b538647" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "detalle_solicitud" ("id" SERIAL NOT NULL, "cantidad_solicitada" integer NOT NULL, "observaciones" text, "id_producto" integer, "id_solicitud" integer, CONSTRAINT "PK_c5923354610b2d8a1426c1bc94c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias_productos" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "unpsc" character varying(50), CONSTRAINT "PK_7b34c3b6d54b0d5fe856e5f4052" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "descripcion" text, "fecha_vencimiento" date, "id_categoria" integer, CONSTRAINT "PK_04f604609a0949a7f3b43400766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventario" ("id_producto_inventario" SERIAL NOT NULL, "stock" integer NOT NULL, "fk_sitio" integer, "id_producto" integer, CONSTRAINT "PK_d90cd7d4d9ef53d10ec16f3dd15" PRIMARY KEY ("id_producto_inventario"))`);
        await queryRunner.query(`CREATE TABLE "sitio" ("id" SERIAL NOT NULL, "nombre" character varying(100), "ubicacion" character varying(150), "estado" character varying(20) NOT NULL DEFAULT 'ACTIVO', "id_area" integer, "id_tipo_sitio" integer, CONSTRAINT "PK_09874265e068d0b50ed13519249" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tipo_sitio" ("id" SERIAL NOT NULL, "nombre" character varying(100), CONSTRAINT "PK_a03e33661558af784b72176ca2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "centro_formacion" ADD CONSTRAINT "FK_3e863cd8ffc69b9543566e42024" FOREIGN KEY ("id_municipio") REFERENCES "municipios"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sedes" ADD CONSTRAINT "FK_e5f4d72d808b52462aeb5468891" FOREIGN KEY ("id_centro_formacion") REFERENCES "centro_formacion"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "FK_e5afe2da9518408549f3b8c8fa3" FOREIGN KEY ("id_sede") REFERENCES "sedes"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "opciones" ADD CONSTRAINT "FK_5ba3ce93b3a98f7cbad6c5db92f" FOREIGN KEY ("id_modulo") REFERENCES "modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permisos" ADD CONSTRAINT "FK_534dd5ac5ef800fdcfefee66547" FOREIGN KEY ("id_rol") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permisos" ADD CONSTRAINT "FK_a7616454153642b55b1477cc494" FOREIGN KEY ("id_opcion") REFERENCES "opciones"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_ce9ce4560bed499dd55a3319349" FOREIGN KEY ("id_area") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_3ecd3d512027034462358743f0f" FOREIGN KEY ("id_ficha_formacion") REFERENCES "fichas_formacion"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_98bf89ebf4b0be2d3825f54e56c" FOREIGN KEY ("id_rol") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fichas_formacion" ADD CONSTRAINT "FK_a8706924df4b86cc849b9b09c82" FOREIGN KEY ("id_titulado") REFERENCES "titulados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fichas_formacion" ADD CONSTRAINT "FK_23589b69905a2ba5d6c3e774437" FOREIGN KEY ("id_usuario_responsable") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_af6f90d271d431fcdef420ad52d" FOREIGN KEY ("id_entrega") REFERENCES "entrega_material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_46e18103a0ccb078511a3317fd9" FOREIGN KEY ("id_producto_inventario") REFERENCES "inventario"("id_producto_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entrega_material" ADD CONSTRAINT "FK_19ac9ee8e60502e8f59b44102ef" FOREIGN KEY ("id_ficha_formacion") REFERENCES "fichas_formacion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entrega_material" ADD CONSTRAINT "FK_475c84626638b84f23f1917fffd" FOREIGN KEY ("id_solicitud") REFERENCES "solicitudes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entrega_material" ADD CONSTRAINT "FK_54db7dbfec6a65080a32d9e00e8" FOREIGN KEY ("id_usuario_responsable") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicitudes" ADD CONSTRAINT "FK_008bb88352cff0f91bd65867689" FOREIGN KEY ("id_usuario_solicitante") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_solicitud" ADD CONSTRAINT "FK_aca82eee2d6ebc2cf973581955e" FOREIGN KEY ("id_producto") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_solicitud" ADD CONSTRAINT "FK_93f38dec6d9128c8b73cac5ad85" FOREIGN KEY ("id_solicitud") REFERENCES "solicitudes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_67e14062fdfd39fba436bccaff3" FOREIGN KEY ("id_categoria") REFERENCES "categorias_productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "inventario" ADD CONSTRAINT "FK_d6145375008529c1c0003105ec2" FOREIGN KEY ("fk_sitio") REFERENCES "sitio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario" ADD CONSTRAINT "FK_467c42d673222f61151a26570fa" FOREIGN KEY ("id_producto") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sitio" ADD CONSTRAINT "FK_d02b8ffdcc5412b7542f77474d4" FOREIGN KEY ("id_area") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sitio" ADD CONSTRAINT "FK_fa27e9322d8cde3dfa09eadae90" FOREIGN KEY ("id_tipo_sitio") REFERENCES "tipo_sitio"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sitio" DROP CONSTRAINT "FK_fa27e9322d8cde3dfa09eadae90"`);
        await queryRunner.query(`ALTER TABLE "sitio" DROP CONSTRAINT "FK_d02b8ffdcc5412b7542f77474d4"`);
        await queryRunner.query(`ALTER TABLE "inventario" DROP CONSTRAINT "FK_467c42d673222f61151a26570fa"`);
        await queryRunner.query(`ALTER TABLE "inventario" DROP CONSTRAINT "FK_d6145375008529c1c0003105ec2"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_67e14062fdfd39fba436bccaff3"`);
        await queryRunner.query(`ALTER TABLE "detalle_solicitud" DROP CONSTRAINT "FK_93f38dec6d9128c8b73cac5ad85"`);
        await queryRunner.query(`ALTER TABLE "detalle_solicitud" DROP CONSTRAINT "FK_aca82eee2d6ebc2cf973581955e"`);
        await queryRunner.query(`ALTER TABLE "solicitudes" DROP CONSTRAINT "FK_008bb88352cff0f91bd65867689"`);
        await queryRunner.query(`ALTER TABLE "entrega_material" DROP CONSTRAINT "FK_54db7dbfec6a65080a32d9e00e8"`);
        await queryRunner.query(`ALTER TABLE "entrega_material" DROP CONSTRAINT "FK_475c84626638b84f23f1917fffd"`);
        await queryRunner.query(`ALTER TABLE "entrega_material" DROP CONSTRAINT "FK_19ac9ee8e60502e8f59b44102ef"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_46e18103a0ccb078511a3317fd9"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_af6f90d271d431fcdef420ad52d"`);
        await queryRunner.query(`ALTER TABLE "fichas_formacion" DROP CONSTRAINT "FK_23589b69905a2ba5d6c3e774437"`);
        await queryRunner.query(`ALTER TABLE "fichas_formacion" DROP CONSTRAINT "FK_a8706924df4b86cc849b9b09c82"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_98bf89ebf4b0be2d3825f54e56c"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_3ecd3d512027034462358743f0f"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_ce9ce4560bed499dd55a3319349"`);
        await queryRunner.query(`ALTER TABLE "permisos" DROP CONSTRAINT "FK_a7616454153642b55b1477cc494"`);
        await queryRunner.query(`ALTER TABLE "permisos" DROP CONSTRAINT "FK_534dd5ac5ef800fdcfefee66547"`);
        await queryRunner.query(`ALTER TABLE "opciones" DROP CONSTRAINT "FK_5ba3ce93b3a98f7cbad6c5db92f"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "FK_e5afe2da9518408549f3b8c8fa3"`);
        await queryRunner.query(`ALTER TABLE "sedes" DROP CONSTRAINT "FK_e5f4d72d808b52462aeb5468891"`);
        await queryRunner.query(`ALTER TABLE "centro_formacion" DROP CONSTRAINT "FK_3e863cd8ffc69b9543566e42024"`);
        await queryRunner.query(`DROP TABLE "tipo_sitio"`);
        await queryRunner.query(`DROP TABLE "sitio"`);
        await queryRunner.query(`DROP TABLE "inventario"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`DROP TABLE "categorias_productos"`);
        await queryRunner.query(`DROP TABLE "detalle_solicitud"`);
        await queryRunner.query(`DROP TABLE "solicitudes"`);
        await queryRunner.query(`DROP TABLE "entrega_material"`);
        await queryRunner.query(`DROP TABLE "movimientos"`);
        await queryRunner.query(`DROP TABLE "fichas_formacion"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permisos"`);
        await queryRunner.query(`DROP TABLE "opciones"`);
        await queryRunner.query(`DROP TABLE "modulos"`);
        await queryRunner.query(`DROP TABLE "areas"`);
        await queryRunner.query(`DROP TABLE "sedes"`);
        await queryRunner.query(`DROP TABLE "centro_formacion"`);
        await queryRunner.query(`DROP TABLE "municipios"`);
        await queryRunner.query(`DROP TABLE "titulados"`);
    }

}
