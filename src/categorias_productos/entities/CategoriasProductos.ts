import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Productos } from "../../productos/entities/Productos";

@Entity("categorias_productos", { schema: "public" })
export class CategoriasProductos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre", length: 100 })
  nombres: string;

  @Column("character varying", { name: "unpsc", nullable: true, length: 50 })
  unpsc: string | null;

  @OneToMany(() => Productos, (productos) => productos.idCategoria)
  productos: Productos[];
}
