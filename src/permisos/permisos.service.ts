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

  // ✅ Actualización masiva corregida
  async actualizarPermisosMasivo(permisos: any[]) {
    const resultados: { id: any; actualizado: boolean; error?: string }[] = [];

    for (const permiso of permisos) {
      const { id, puedeVer, puedeCrear, puedeEditar, puedeEliminar } = permiso;

      const permisoExistente = await this.permisoRepository.findOne({ where: { id } });

      if (!permisoExistente) {
        resultados.push({ id, actualizado: false, error: 'Permiso no encontrado' });
        continue;
      }

      permisoExistente.puedeVer = puedeVer;
      permisoExistente.puedeCrear = puedeCrear;
      permisoExistente.puedeEditar = puedeEditar;
      permisoExistente.puedeEliminar = puedeEliminar;

      await this.permisoRepository.save(permisoExistente);
      resultados.push({ id, actualizado: true });
    }

    return {
      message: 'Permisos actualizados correctamente',
      actualizados: resultados.filter(r => r.actualizado).length,
      errores: resultados.filter(r => !r.actualizado),
    };
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

  // ✅ Obtener módulos únicos por rol
  async obtenerModulosPorRol(idRol: number): Promise<{ id: number; nombreModulo: string }[]> {
    const modulos = await this.permisoRepository
      .createQueryBuilder('permiso')
      .innerJoin('permiso.opcion', 'opcion')
      .innerJoin('opcion.modulo', 'modulo')
      .where('permiso.id_rol = :idRol', { idRol })
      .select([
        'modulo.id AS id',
        'modulo.nombre_modulo AS nombreModulo',
      ])
      .distinct(true)
      .getRawMany();

    return modulos;
  }
}
