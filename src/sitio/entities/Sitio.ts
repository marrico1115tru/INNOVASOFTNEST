import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Inventario } from "../../inventario/entities/Inventario";
import { Areas } from "../../areas/entities/Areas";
import { TipoSitio } from "../../tipo_sitio/entities/TipoSitio";


@Entity("sitio", { schema: "public" })
export class Sitio {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("character varying", {
    name: "ubicacion",
    nullable: true,
    length: 150,
  })
  ubicacion: string | null;

    @Column("character varying", {
    name: "estado",
    length: 20,
    default: () => `'ACTIVO'`,
  })
  estado: string;

  @OneToMany(() => Inventario, (inventario) => inventario.fkSitio)
  inventarios: Inventario[];

  @ManyToOne(() => Areas, (areas) => areas.sitios, { onDelete: "RESTRICT" })
  @JoinColumn([{ name: "id_area", referencedColumnName: "id" }])
  idArea: Areas;

  @ManyToOne(() => TipoSitio, (tipoSitio) => tipoSitio.sitios, {
    onDelete: "RESTRICT",
  })
  @JoinColumn([{ name: "id_tipo_sitio", referencedColumnName: "id" }])
  idTipoSitio: TipoSitio;
}
