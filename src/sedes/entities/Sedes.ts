import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Areas } from "../../areas/entities/Areas";
import { CentroFormacion } from "../../centro_formacion/entities/CentroFormacion";


@Entity("sedes", { schema: "public" })
export class Sedes {
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

  @OneToMany(() => Areas, (areas) => areas.idSede)
  areas: Areas[];

  @ManyToOne(
    () => CentroFormacion,
    (centroFormacion) => centroFormacion.sedes,
    { onDelete: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_centro_formacion", referencedColumnName: "id" }])
  idCentroFormacion: CentroFormacion;
}
