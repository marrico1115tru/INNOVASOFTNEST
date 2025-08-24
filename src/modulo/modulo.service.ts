import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modulo } from './entities/modulo.entity';

@Injectable()
export class ModuloService {
  constructor(
    @InjectRepository(Modulo)
    private readonly moduloRepository: Repository<Modulo>,
  ) {}

  async findAll(): Promise<Modulo[]> {
    return this.moduloRepository.find();
  }

  async findAllWithOptions(): Promise<Modulo[]> {
    return this.moduloRepository.find({
      relations: ['opciones'],
      order: {
        id: 'ASC',
        opciones: { id: 'ASC' }
      }
    });
  }

  async findOne(id: number): Promise<Modulo> {
    const modulo = await this.moduloRepository.findOne({
      where: { id },
      relations: ['opciones'],
    });
    if (!modulo) {
      throw new NotFoundException(`Módulo con ID ${id} no encontrado`);
    }
    return modulo;
  }

  async create(data: Partial<Modulo>): Promise<Modulo> {
    const nuevo = this.moduloRepository.create(data);
    return await this.moduloRepository.save(nuevo);
  }

  async update(id: number, data: Partial<Modulo>): Promise<Modulo> {
    const modulo = await this.findOne(id);
    Object.assign(modulo, data);
    return await this.moduloRepository.save(modulo);
  }

  async remove(id: number): Promise<void> {
    const modulo = await this.findOne(id);
    await this.moduloRepository.remove(modulo);
  }
}
