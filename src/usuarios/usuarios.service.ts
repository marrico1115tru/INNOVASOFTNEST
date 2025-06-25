// src/usuarios/usuarios.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Usuarios } from './entities/Usuarios';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
    private readonly dataSource: DataSource
  ) {}

  async findAll(): Promise<Usuarios[]> {
    return this.usuarioRepository.find({
      relations: ['rol', 'idArea', 'idFichaFormacion'],
    });
  }

  async findOne(id: number): Promise<Usuarios> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['rol', 'idArea', 'idFichaFormacion'],
    });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  async create(data: Partial<Usuarios>): Promise<Usuarios> {
    const nuevo = this.usuarioRepository.create(data);
    const hashedPassword = await bcrypt.hash(nuevo.password, 10);
    nuevo.password = hashedPassword;
    return this.usuarioRepository.save(nuevo);
  }

  async update(id: number, data: Partial<Usuarios>): Promise<Usuarios> {
    const usuario = await this.findOne(id);
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    Object.assign(usuario, data);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }

  async findByEmail(email: string, p0: { relations: string[]; }): Promise<Usuarios> {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
      relations: ['rol', 'idArea', 'idFichaFormacion'],
    });
    if (!usuario) throw new NotFoundException(`Usuario ${email} no encontrado`);
    return usuario;
  }

  async obtenerDistribucionUsuariosPorRol(): Promise<{ nombreRol: string; cantidad: number }[]> {
    return this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoin('usuario.rol', 'rol')
      .select('rol.nombre_rol', 'nombreRol')
      .addSelect('COUNT(usuario.id)', 'cantidad')
      .groupBy('rol.nombre_rol')
      .orderBy('cantidad', 'DESC')
      .getRawMany();
  }

  async getEstadisticasMensualesPorRol() {
    const resultado = await this.dataSource.query(`
      SELECT
        r.nombre_rol AS rol,
        TO_CHAR(s.fecha_solicitud, 'Month') AS mes,
        COUNT(DISTINCT s.id) AS total_solicitudes,
        COUNT(DISTINCT e.id) AS total_entregas
      FROM usuarios u
      INNER JOIN roles r ON r.id = u.id_rol
      LEFT JOIN solicitudes s ON s.id_usuario_solicitante = u.id
      LEFT JOIN entrega_material e ON e.id_usuario_responsable = u.id
      GROUP BY r.nombre_rol, mes
      ORDER BY r.nombre_rol, mes;
    `);

    return resultado;

  }

  async getUsuariosConMayorUsoProductos() {
    const resultado = await this.dataSource.query(`
      SELECT u.id, u.nombre, u.apellido, COUNT(s.id) AS total_solicitudes
      FROM usuarios u
      JOIN solicitudes s ON s.id_usuario_solicitante = u.id
      GROUP BY u.id, u.nombre, u.apellido
      ORDER BY total_solicitudes DESC
      LIMIT 10;
    `);
    return resultado;
  }
}
