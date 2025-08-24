import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FichasFormacion } from "../../fichas_formacion/entities/FichasFormacion.entity";


@Entity("titulados", { schema: "public" })
export class Titulados {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @OneToMany(
    () => FichasFormacion,
    (fichasFormacion) => fichasFormacion.idTitulado
  )
  fichasFormacions: FichasFormacion[];
}
