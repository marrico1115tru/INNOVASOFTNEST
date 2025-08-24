import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipios } from "../../municipios/entities/Municipios.entity";
import { Sedes } from "../../sedes/entities/Sedes.entity";

@Entity("centro_formacion", { schema: "public" })
export class CentroFormacion {
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

  @Column("character varying", { name: "telefono", nullable: true, length: 20 })
  telefono: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @ManyToOne(() => Municipios, (municipios) => municipios.centroFormacions, {
    onDelete: "RESTRICT",
  })
  @JoinColumn([{ name: "id_municipio", referencedColumnName: "id" }])
  idMunicipio: Municipios;

  @OneToMany(() => Sedes, (sedes) => sedes.idCentroFormacion)
  sedes: Sedes[];
}
