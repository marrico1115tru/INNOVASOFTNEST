import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EntregaMaterial } from "../../entrega_material/entities/EntregaMaterial";
import { Titulados } from "../../titulados/entities/Titulados";
import { Usuarios } from "../../usuarios/entities/Usuarios";


@Entity("fichas_formacion", { schema: "public" })
export class FichasFormacion {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @OneToMany(
    () => EntregaMaterial,
    (entregaMaterial) => entregaMaterial.idFichaFormacion
  )
  entregaMaterials: EntregaMaterial[];

  @ManyToOne(() => Titulados, (titulados) => titulados.fichasFormacions)
  @JoinColumn([{ name: "id_titulado", referencedColumnName: "id" }])
  idTitulado: Titulados;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.fichasFormacions)
  @JoinColumn([{ name: "id_usuario_responsable", referencedColumnName: "id" }])
  idUsuarioResponsable: Usuarios;

  @OneToMany(() => Usuarios, (usuarios) => usuarios.idFichaFormacion)
  usuarios: Usuarios[];
}
