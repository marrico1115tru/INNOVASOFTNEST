import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sedes } from "../../sedes/entities/Sedes";
import { Sitio } from "../../sitio/entities/Sitio";
import { Usuarios } from "../../usuarios/entities/Usuarios";


@Entity("areas", { schema: "public" })
export class Areas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "nombre_area",
    nullable: true,
    length: 100,
  })
  nombreArea: string | null;

  @ManyToOne(() => Sedes, (sedes) => sedes.areas, { onDelete: "RESTRICT" })
  @JoinColumn([{ name: "id_sede", referencedColumnName: "id" }])
  idSede: Sedes;

  @OneToMany(() => Sitio, (sitio) => sitio.idArea)
  sitios: Sitio[];

  @OneToMany(() => Usuarios, (usuarios) => usuarios.idArea)
  usuarios: Usuarios[];
}
