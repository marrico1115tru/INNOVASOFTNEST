import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EntregaMaterial } from "../../entrega_material/entities/EntregaMaterial";
import { Inventario } from "../../inventario/entities/Inventario";


@Entity("movimientos", { schema: "public" })
export class Movimientos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "tipo_movimiento", length: 50 })
  tipoMovimiento: string;

  @Column("integer", { name: "cantidad" })
  cantidad: number;

  @Column("date", { name: "fecha_movimiento" })
  fechaMovimiento: string;

  @ManyToOne(
    () => EntregaMaterial,
    (entregaMaterial) => entregaMaterial.movimientos
  )
  @JoinColumn([{ name: "id_entrega", referencedColumnName: "id" }])
  idEntrega: EntregaMaterial;

  @ManyToOne(() => Inventario, (inventario) => inventario.movimientos)
  @JoinColumn([
    {
      name: "id_producto_inventario",
      referencedColumnName: "idProductoInventario",
    },
  ])
  idProductoInventario: Inventario;
}
