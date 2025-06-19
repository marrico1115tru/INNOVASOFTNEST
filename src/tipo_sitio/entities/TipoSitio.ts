import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sitio } from "../../sitio/entities/Sitio";

@Entity("tipo_sitio", { schema: "public" })
export class TipoSitio {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @OneToMany(() => Sitio, (sitio) => sitio.idTipoSitio)
  sitios: Sitio[];
}
