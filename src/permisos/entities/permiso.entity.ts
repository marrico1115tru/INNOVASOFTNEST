import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Rol } from '../../roles/entities/rol.entity';
import { Opcion } from '../../opciones/entities/opcion.entity';

@Entity('permisos', { schema: 'public' })
export class Permiso {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ name: 'puede_ver', type: 'boolean', default: false })
  puedeVer: boolean;

  @Column({ name: 'puede_crear', type: 'boolean', default: false })
  puedeCrear: boolean;

  @Column({ name: 'puede_editar', type: 'boolean', default: false })
  puedeEditar: boolean;

  @Column({ name: 'puede_eliminar', type: 'boolean', default: false })
  puedeEliminar: boolean;

  // Relación con Rol
  @ManyToOne(() => Rol, (rol) => rol.permisos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;

  // Relación con Opción
  @ManyToOne(() => Opcion, (opcion) => opcion.permisos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_opcion' })
  opcion: Opcion;
}
