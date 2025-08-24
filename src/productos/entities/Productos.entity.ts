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
import { Inventario } from "../../inventario/entities/Inventario.entity";
import { CategoriasProductos } from "../../categorias_productos/entities/CategoriasProductos.entity";


@Entity("productos", { schema: "public" })
export class Productos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("date", { name: "fecha_vencimiento", nullable: true })
  fechaVencimiento: string | null;

  @OneToMany(
    () => DetalleSolicitud,
    (detalleSolicitud) => detalleSolicitud.idProducto
  )
  detalleSolicituds: DetalleSolicitud[];

  @OneToMany(() => Inventario, (inventario) => inventario.idProducto)
  inventarios: Inventario[];

  @ManyToOne(
    () => CategoriasProductos,
    (categoriasProductos) => categoriasProductos.productos,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_categoria", referencedColumnName: "id" }])
  idCategoria: CategoriasProductos;
}
