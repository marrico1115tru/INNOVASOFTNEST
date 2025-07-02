import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from './entities/permiso';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
  ) {}

  // ✅ Obtener todos los permisos
  async findAll(): Promise<Permiso[]> {
    return this.permisoRepository.find({
      relations: ['rol', 'opcion'],
    });
  }

  // ✅ Obtener un permiso por ID
  async findOne(id: number): Promise<Permiso> {
    const permiso = await this.permisoRepository.findOne({
      where: { id },
      relations: ['rol', 'opcion'],
    });

    if (!permiso) {
      throw new NotFoundException(`Permiso con ID ${id} no encontrado`);
    }

    return permiso;
  }

  // ✅ Crear un nuevo permiso
  async create(data: Partial<Permiso>): Promise<Permiso> {
    const permiso = this.permisoRepository.create(data);
    return this.permisoRepository.save(permiso);
  }

  // ✅ Actualizar un permiso existente
  async update(id: number, data: Partial<Permiso>): Promise<Permiso> {
    const permiso = await this.findOne(id);
    Object.assign(permiso, data);
    return this.permisoRepository.save(permiso);
  }

  // ✅ Eliminar permiso
  async remove(id: number): Promise<void> {
    const permiso = await this.findOne(id);
    await this.permisoRepository.remove(permiso);
  }

  // ✅ Obtener permisos por rol
  async getPermisosPorRol(idRol: number): Promise<Permiso[]> {
    return this.permisoRepository.find({
      where: { rol: { id: idRol } },
      relations: ['rol', 'opcion'],
    });
  }

  // ✅ Obtener permisos por rol ordenados por opción
  async obtenerPorRol(idRol: number): Promise<Permiso[]> {
    return this.permisoRepository.find({
      where: { rol: { id: idRol } },
      relations: ['opcion', 'rol'],
      order: {
        opcion: {
          nombreOpcion: 'ASC',
        },
      },
    });
  }

  // ✅ Obtener permisos por ruta y rol
  async getPermisoPorRutaYRol(ruta: string, idRol: number) {
    const permiso = await this.permisoRepository
      .createQueryBuilder('permiso')
      .innerJoinAndSelect('permiso.opcion', 'opcion')
      .innerJoin('permiso.rol', 'rol')
      .where('opcion.ruta_frontend = :ruta', { ruta })
      .andWhere('rol.id = :idRol', { idRol })
      .select([
        'permiso.puedeVer',
        'permiso.puedeCrear',
        'permiso.puedeEditar',
        'permiso.puedeEliminar',
      ])
      .getOne();

    return (
      permiso || {
        puedeVer: false,
        puedeCrear: false,
        puedeEditar: false,
        puedeEliminar: false,
      }
    );
  }
}
