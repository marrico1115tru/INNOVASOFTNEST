import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Usuarios } from '../../usuarios/entities/usuarios.entity';
import { Permiso } from '../../permisos/entities/permiso.entity';

@Entity('roles', { schema: 'public' })
export class Rol {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('character varying', { name: 'nombre_rol', length: 100 })
  nombreRol: string;

  // Relación con Usuarios
  @OneToMany(() => Usuarios, (usuario) => usuario.rol)
  usuarios: Usuarios[];

  // Relación con Permisos
  @OneToMany(() => Permiso, (permiso) => permiso.rol)
  permisos: Permiso[];
}
