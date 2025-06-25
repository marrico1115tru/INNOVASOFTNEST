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
import { FichasFormacion } from "../../fichas_formacion/entities/FichasFormacion";
import { Solicitudes } from "../../solicitudes/entities/Solicitudes";
import { Areas } from "../../areas/entities/Areas";
import { Rol } from "../../roles/entities/rol";

@Entity("usuarios", { schema: "public" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("character varying", { name: "apellido", nullable: true, length: 100 })
  apellido: string | null;

  @Column("character varying", {
    name: "cedula",
    nullable: true,
    unique: true,
    length: 20,
  })
  cedula: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("character varying", { name: "telefono", nullable: true, length: 20 })
  telefono: string | null;
 
  @Column("character varying", { name: "password", length: 100 })
  password: string;

  @OneToMany(() => EntregaMaterial, (entregaMaterial) => entregaMaterial.idUsuarioResponsable)
  entregaMaterials: EntregaMaterial[];

  @OneToMany(() => FichasFormacion, (fichasFormacion) => fichasFormacion.idUsuarioResponsable)
  fichasFormacions: FichasFormacion[];

  @OneToMany(() => Solicitudes, (solicitudes) => solicitudes.idUsuarioSolicitante)
  solicitudes: Solicitudes[];

  @ManyToOne(() => Areas, (areas) => areas.usuarios, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_area", referencedColumnName: "id" }])
  idArea: Areas;

  @ManyToOne(() => FichasFormacion, (fichasFormacion) => fichasFormacion.usuarios)
  @JoinColumn([{ name: "id_ficha_formacion", referencedColumnName: "id" }])
  idFichaFormacion: FichasFormacion;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_rol", referencedColumnName: "id" }])
  rol: Rol;
  permisos: never[];
}
