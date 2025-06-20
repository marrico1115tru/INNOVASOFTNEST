import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/Usuarios';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
  ) {}

  // Obtener todos los usuarios con relaciones
  async findAll(): Promise<Usuarios[]> {
    return this.usuarioRepository.find({
      relations: ['rol', 'idArea', 'idFichaFormacion'],
    });
  }

  // Buscar usuario por ID
  async findOne(id: number): Promise<Usuarios> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['rol', 'idArea', 'idFichaFormacion'],
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  // Crear usuario con contraseña cifrada
  async create(data: Partial<Usuarios>): Promise<Usuarios> {
    const nuevo = this.usuarioRepository.create(data);
    const hashedPassword = await bcrypt.hash(nuevo.password, 10);
    nuevo.password = hashedPassword;
    return this.usuarioRepository.save(nuevo);
  }

  // Actualizar usuario y cifrar contraseña
  async update(id: number, data: Partial<Usuarios>): Promise<Usuarios> {
    const usuario = await this.findOne(id);
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    Object.assign(usuario, data);
    return this.usuarioRepository.save(usuario);
  }

  // Eliminar usuario
  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }

  // Buscar usuario por email
  async findByEmail(email: string): Promise<Usuarios> {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
      relations: ['rol', 'idArea', 'idFichaFormacion'],
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con correo ${email} no encontrado`);
    }
    return usuario;
  }

  // ✅ Distribución de usuarios por rol (para gráficas)
async obtenerDistribucionUsuariosPorRol(): Promise<
  { nombreRol: string; cantidad: number }[]
> {
  return this.usuarioRepository
    .createQueryBuilder('usuario')
    .leftJoin('usuario.rol', 'rol')
    .select('rol.nombre_rol', 'nombreRol')
    .addSelect('COUNT(usuario.id)', 'cantidad')
    .groupBy('rol.nombre_rol')
    .orderBy('cantidad', 'DESC')
    .getRawMany();
}

}
