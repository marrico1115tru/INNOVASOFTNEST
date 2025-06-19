import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Productos } from "../../productos/entities/Productos";
import { Solicitudes } from "../../solicitudes/entities/Solicitudes";


@Entity("detalle_solicitud", { schema: "public" })
export class DetalleSolicitud {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "cantidad_solicitada" })
  cantidadSolicitada: number;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @ManyToOne(() => Productos, (productos) => productos.detalleSolicituds, {
    onDelete: "RESTRICT",
  })
  @JoinColumn([{ name: "id_producto", referencedColumnName: "id" }])
  idProducto: Productos;

  @ManyToOne(
    () => Solicitudes,
    (solicitudes) => solicitudes.detalleSolicituds,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "id_solicitud", referencedColumnName: "id" }])
  idSolicitud: Solicitudes;
}
