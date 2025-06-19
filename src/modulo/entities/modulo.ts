import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Opcion } from '../../opciones/entities/opcion';

@Entity('modulos', { schema: 'public' })
export class Modulo {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('character varying', { name: 'nombre_modulo', length: 100 })
  nombreModulo: string;

  @OneToMany(() => Opcion, (opcion) => opcion.modulo)
  opciones: Opcion[];
}
