import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Areas } from './entities/Areas';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Areas)
    private readonly areasRepository: Repository<Areas>,
  ) {}

  findAll(): Promise<Areas[]> {
    return this.areasRepository.find({
      relations: ['idSede', 'sitios', 'usuarios'],
    });
  }

  async findOne(id: number): Promise<Areas> {
    const area = await this.areasRepository.findOne({
      where: { id },
      relations: ['idSede', 'sitios', 'usuarios'],
    });

    if (!area) {
      throw new NotFoundException(`Área con ID ${id} no encontrada`);
    }

    return area;
  }

  create(data: Partial<Areas>): Promise<Areas> {
    const nueva = this.areasRepository.create(data);
    return this.areasRepository.save(nueva);
  }

  async update(id: number, data: Partial<Areas>): Promise<Areas> {
    const area = await this.findOne(id);
    Object.assign(area, data);
    return this.areasRepository.save(area);
  }

  async remove(id: number): Promise<void> {
    const area = await this.findOne(id);
    await this.areasRepository.remove(area);
  }
}
