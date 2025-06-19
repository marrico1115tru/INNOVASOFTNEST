import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Modulo } from '../../modulo/entities/modulo';
import { Permiso } from '../../permisos/entities/permiso';

@Entity('opciones', { schema: 'public' })
export class Opcion {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('character varying', { name: 'nombre_opcion', length: 100 })
  nombreOpcion: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column('character varying', {
    name: 'ruta_frontend',
    length: 150,
    nullable: true,
  })
  rutaFrontend: string;

  @ManyToOne(() => Modulo, (modulo) => modulo.opciones, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_modulo' })
  modulo: Modulo;

  @OneToMany(() => Permiso, (permiso) => permiso.opcion)
  permisos: Permiso[];
}
