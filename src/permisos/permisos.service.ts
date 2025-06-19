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

  async findAll(): Promise<Permiso[]> {
    return this.permisoRepository.find({ relations: ['rol', 'opcion'] });
  }

  async findOne(id: number): Promise<Permiso> {
    const permiso = await this.permisoRepository.findOne({
      where: { id },
      relations: ['rol', 'opcion'],
    });
    if (!permiso) throw new NotFoundException(`Permiso con ID ${id} no encontrado`);
    return permiso;
  }

  async create(data: Partial<Permiso>): Promise<Permiso> {
    const permiso = this.permisoRepository.create(data);
    return this.permisoRepository.save(permiso);
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
}
