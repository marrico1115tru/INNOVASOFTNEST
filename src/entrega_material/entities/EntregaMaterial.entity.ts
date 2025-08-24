import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FichasFormacion } from "../../fichas_formacion/entities/FichasFormacion.entity";
import { Solicitudes } from "../../solicitudes/entities/Solicitudes.entity";
import { Usuarios } from "../../usuarios/entities/usuarios.entity";
import { Movimientos } from "../../movimientos/entities/Movimientos.entity";


@Entity("entrega_material", { schema: "public" })
export class EntregaMaterial {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "fecha_entrega" })
  fechaEntrega: string;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @ManyToOne(
    () => FichasFormacion,
    (fichasFormacion) => fichasFormacion.entregaMaterials
  )
  @JoinColumn([{ name: "id_ficha_formacion", referencedColumnName: "id" }])
  idFichaFormacion: FichasFormacion;

  @ManyToOne(() => Solicitudes, (solicitudes) => solicitudes.entregaMaterials)
  @JoinColumn([{ name: "id_solicitud", referencedColumnName: "id" }])
  idSolicitud: Solicitudes;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.entregaMaterials)
  @JoinColumn([{ name: "id_usuario_responsable", referencedColumnName: "id" }])
  idUsuarioResponsable: Usuarios;

  @OneToMany(() => Movimientos, (movimientos) => movimientos.idEntrega)
  movimientos: Movimientos[];
}
