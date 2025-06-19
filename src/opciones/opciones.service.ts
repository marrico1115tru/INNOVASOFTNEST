import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opcion } from './entities/opcion';

@Injectable()
export class OpcionesService {
  constructor(
    @InjectRepository(Opcion)
    private readonly opcionRepository: Repository<Opcion>,
  ) {}

  async findAll(): Promise<Opcion[]> {
    return this.opcionRepository.find({ relations: ['modulo', 'permisos'] });
  }

  async findOne(id: number): Promise<Opcion> {
    const opcion = await this.opcionRepository.findOne({
      where: { id },
      relations: ['modulo', 'permisos'],
    });
    if (!opcion) throw new NotFoundException(`Opción con ID ${id} no encontrada`);
    return opcion;
  }

  async create(data: Partial<Opcion>): Promise<Opcion> {
    const nueva = this.opcionRepository.create(data);
    return await this.opcionRepository.save(nueva);
  }

  async update(id: number, data: Partial<Opcion>): Promise<Opcion> {
    const opcion = await this.findOne(id);
    Object.assign(opcion, data);
    return await this.opcionRepository.save(opcion);
  }

  async remove(id: number): Promise<void> {
    const opcion = await this.findOne(id);
    await this.opcionRepository.remove(opcion);
  }
}
