import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from './entities/permiso';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
  ) {}

  async findAll(): Promise<Permiso[]> {
    return this.permisoRepository.find({
      relations: ['rol', 'opcion'],
    });
  }
  

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
      actualizados: resultados.filter((r) => r.actualizado).length,
      errores: resultados.filter((r) => !r.actualizado),
    };
  }

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

  async create(data: Partial<Permiso>): Promise<Permiso> {
    const { id_rol, id_opcion, puedeVer, puedeCrear, puedeEditar, puedeEliminar } = data as any;

    if (!id_rol || !id_opcion) {
      throw new BadRequestException('id_rol e id_opcion son obligatorios');
    }

    const yaExiste = await this.permisoRepository.findOne({
      where: {
        rol: { id: id_rol },
        opcion: { id: id_opcion },
      },
      relations: ['rol', 'opcion'],
    });

    if (yaExiste) {
      throw new BadRequestException('Ya existe un permiso para este rol y esta opción');
    }

    const nuevo = this.permisoRepository.create({
      rol: { id: id_rol },
      opcion: { id: id_opcion },
      puedeVer: !!puedeVer,
      puedeCrear: !!puedeCrear,
      puedeEditar: !!puedeEditar,
      puedeEliminar: !!puedeEliminar,
    });

    return await this.permisoRepository.save(nuevo);
  }

  async update(id: number, data: Partial<Permiso>): Promise<Permiso> {
    const permiso = await this.findOne(id);
    Object.assign(permiso, data);
    return this.permisoRepository.save(permiso);
  }

  async remove(id: number): Promise<void> {
    const permiso = await this.findOne(id);
    await this.permisoRepository.remove(permiso);
  }

  async getPermisosPorRol(idRol: number): Promise<Permiso[]> {
    return this.permisoRepository.find({
      where: { rol: { id: idRol } },
      relations: ['rol', 'opcion'],
    });
  }

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

  async obtenerModulosPorRol(idRol: number): Promise<{ id: number; nombreModulo: string }[]> {
    const modulos = await this.permisoRepository
      .createQueryBuilder('permiso')
      .innerJoin('permiso.opcion', 'opcion')
      .innerJoin('opcion.modulo', 'modulo')
      .where('permiso.id_rol = :idRol', { idRol })
      .select(['modulo.id AS id', 'modulo.nombre_modulo AS nombreModulo'])
      .distinct(true)
      .getRawMany();

    return modulos;
  }
}
