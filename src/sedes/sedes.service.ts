import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sedes } from './entities/Sedes.entity';

@Injectable()
export class SedesService {
  constructor(
    @InjectRepository(Sedes)
    private readonly sedesRepo: Repository<Sedes>,
  ) {}

  findAll(): Promise<Sedes[]> {
    return this.sedesRepo.find({
      relations: ['areas', 'idCentroFormacion'],
    });
  }

  async findOne(id: number): Promise<Sedes> {
    const sede = await this.sedesRepo.findOne({
      where: { id },
      relations: ['areas', 'idCentroFormacion'],
    });
    if (!sede) {
      throw new NotFoundException(`Sede con ID ${id} no encontrada`);
    }
    return sede;
  }

  create(data: Partial<Sedes>): Promise<Sedes> {
    const nueva = this.sedesRepo.create(data);
    return this.sedesRepo.save(nueva);
  }

  async update(id: number, data: Partial<Sedes>): Promise<Sedes> {
    const sede = await this.findOne(id);
    Object.assign(sede, data);
    return this.sedesRepo.save(sede);
  }

  async remove(id: number): Promise<void> {
    const sede = await this.findOne(id);
    await this.sedesRepo.remove(sede);
  }
}
