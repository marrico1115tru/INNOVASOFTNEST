import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipios } from './entities/Municipios';

@Injectable()
export class MunicipiosService {
  constructor(
    @InjectRepository(Municipios)
    private readonly municipiosRepo: Repository<Municipios>,
  ) {}

  findAll(): Promise<Municipios[]> {
    return this.municipiosRepo.find({
      relations: ['centroFormacions'],
    });
  }

  async findOne(id: number): Promise<Municipios> {
    const municipio = await this.municipiosRepo.findOne({
      where: { id },
      relations: ['centroFormacions'],
    });

    if (!municipio) {
      throw new NotFoundException(`Municipio con ID ${id} no encontrado`);
    }

    return municipio;
  }

  create(data: Partial<Municipios>): Promise<Municipios> {
    const nuevo = this.municipiosRepo.create(data);
    return this.municipiosRepo.save(nuevo);
  }

  async update(id: number, data: Partial<Municipios>): Promise<Municipios> {
    const municipio = await this.findOne(id);
    Object.assign(municipio, data);
    return this.municipiosRepo.save(municipio);
  }

  async remove(id: number): Promise<void> {
    const municipio = await this.findOne(id);
    await this.municipiosRepo.remove(municipio);
  }
}
