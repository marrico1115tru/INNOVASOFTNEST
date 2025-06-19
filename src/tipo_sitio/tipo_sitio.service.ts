import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoSitio } from './entities/TipoSitio';
import { Repository } from 'typeorm';

@Injectable()
export class TipoSitioService {
  constructor(
    @InjectRepository(TipoSitio)
    private readonly tipoSitioRepo: Repository<TipoSitio>,
  ) {}

  findAll(): Promise<TipoSitio[]> {
    return this.tipoSitioRepo.find({ relations: ['sitios'] });
  }

  async findOne(id: number): Promise<TipoSitio> {
    const sitio = await this.tipoSitioRepo.findOne({
      where: { id },
      relations: ['sitios'],
    });
    if (!sitio) throw new NotFoundException(`TipoSitio ${id} no encontrado`);
    return sitio;
  }

  create(data: Partial<TipoSitio>): Promise<TipoSitio> {
    const nuevo = this.tipoSitioRepo.create(data);
    return this.tipoSitioRepo.save(nuevo);
  }

  async update(id: number, data: Partial<TipoSitio>): Promise<TipoSitio> {
    const existente = await this.findOne(id);
    Object.assign(existente, data);
    return this.tipoSitioRepo.save(existente);
  }

  async remove(id: number): Promise<void> {
    const existente = await this.findOne(id);
    await this.tipoSitioRepo.remove(existente);
  }
}
