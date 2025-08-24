import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetalleSolicitud } from "../../detalle_solicitud/entities/DetalleSolicitud.entity";
import { EntregaMaterial } from "../../entrega_material/entities/EntregaMaterial.entity";
import { Usuarios } from "../../usuarios/entities/usuarios.entity";


@Entity("solicitudes", { schema: "public" })
export class Solicitudes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("date", { name: "fecha_solicitud" })
  fechaSolicitud: string;

  @Column("character varying", {
    name: "estado_solicitud",
    nullable: true,
    length: 50,
  })
  estadoSolicitud: string | null;

  @OneToMany(
    () => DetalleSolicitud,
    (detalleSolicitud) => detalleSolicitud.idSolicitud
  )
  detalleSolicituds: DetalleSolicitud[];

  @OneToMany(
    () => EntregaMaterial,
    (entregaMaterial) => entregaMaterial.idSolicitud
  )
  entregaMaterials: EntregaMaterial[];

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.solicitudes)
  @JoinColumn([{ name: "id_usuario_solicitante", referencedColumnName: "id" }])
  idUsuarioSolicitante: Usuarios;
}
