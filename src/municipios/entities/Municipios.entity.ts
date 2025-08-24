import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CentroFormacion } from "../../centro_formacion/entities/CentroFormacion.entity";


@Entity("municipios", { schema: "public" })
export class Municipios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("character varying", {
    name: "departamento",
    nullable: true,
    length: 100,
  })
  departamento: string | null;

  @OneToMany(
    () => CentroFormacion,
    (centroFormacion) => centroFormacion.idMunicipio
  )
  centroFormacions: CentroFormacion[];
}
