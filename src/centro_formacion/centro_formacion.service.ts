import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CentroFormacion } from './entities/CentroFormacion';

@Injectable()
export class CentroFormacionService {
  constructor(
    @InjectRepository(CentroFormacion)
    private readonly centroRepo: Repository<CentroFormacion>,
  ) {}

  findAll(): Promise<CentroFormacion[]> {
    return this.centroRepo.find({
      relations: ['idMunicipio', 'sedes'],
    });
  }

  async findOne(id: number): Promise<CentroFormacion> {
    const centro = await this.centroRepo.findOne({
      where: { id },
      relations: ['idMunicipio', 'sedes'],
    });

    if (!centro) {
      throw new NotFoundException(`Centro de formación con ID ${id} no encontrado`);
    }

    return centro;
  }

  create(data: Partial<CentroFormacion>): Promise<CentroFormacion> {
    const nuevo = this.centroRepo.create(data);
    return this.centroRepo.save(nuevo);
  }

  async update(id: number, data: Partial<CentroFormacion>): Promise<CentroFormacion> {
    const centro = await this.findOne(id);
    Object.assign(centro, data);
    return this.centroRepo.save(centro);
  }

  async remove(id: number): Promise<void> {
    const centro = await this.findOne(id);
    await this.centroRepo.remove(centro);
  }
}
