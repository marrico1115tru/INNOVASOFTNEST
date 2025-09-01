import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sitio } from "../../sitio/entities/Sitio.entity";
import { Productos } from "../../productos/entities/Productos.entity";
import { Movimientos } from "../../movimientos/entities/Movimientos.entity";

@Entity("inventario", { schema: "public" })
export class Inventario {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_producto_inventario" })
  idProductoInventario: number;

  @Column("varchar", { name: "placa_sena", length: 50, nullable: true })
  placaSena?: string;


  @Column('date', { name: 'fecha_entrada', nullable: false })
  fechaEntrada: string;

  @Column('date', { name: 'fecha_salida', nullable: true })
  fechaSalida?: string;

  
  @ManyToOne(() => Sitio, (sitio) => sitio.inventarios)
  @JoinColumn([{ name: "fk_sitio", referencedColumnName: "id" }])
  fkSitio: Sitio;

  @ManyToOne(() => Productos, (productos) => productos.inventarios)
  @JoinColumn([{ name: "id_producto", referencedColumnName: "id" }])
  idProducto: Productos;

  @OneToMany(() => Movimientos, (movimientos) => movimientos.idProductoInventario)
  movimientos: Movimientos[];

  @Column("integer", { name: "stock", default: 1 })
  stock: number;
}