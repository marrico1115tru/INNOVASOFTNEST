import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sitio } from './entities/Sitio';

@Injectable()
export class SitioService {
  constructor(
    @InjectRepository(Sitio)
    private readonly sitioRepo: Repository<Sitio>,
  ) {}

  findAll(): Promise<Sitio[]> {
    return this.sitioRepo.find({
      relations: ['idArea', 'idTipoSitio', 'inventarios'],
    });
  }

  async findOne(id: number): Promise<Sitio> {
    const sitio = await this.sitioRepo.findOne({
      where: { id },
      relations: ['idArea', 'idTipoSitio', 'inventarios'],
    });
    if (!sitio) {
      throw new NotFoundException(`Sitio con ID ${id} no encontrado`);
    }
    return sitio;
  }

  create(data: Partial<Sitio>): Promise<Sitio> {
    const nuevo = this.sitioRepo.create(data);
    return this.sitioRepo.save(nuevo);
  }

  async update(id: number, data: Partial<Sitio>): Promise<Sitio> {
    const sitio = await this.findOne(id);
    Object.assign(sitio, data);
    return this.sitioRepo.save(sitio);
  }

  async remove(id: number): Promise<void> {
    const sitio = await this.findOne(id);
    await this.sitioRepo.remove(sitio);
  }

  // ✅ Método corregido
  async contarSitiosPorEstado(): Promise<{ estado: string; cantidad: number }[]> {
    return await this.sitioRepo
      .createQueryBuilder("sitio")
      .select("sitio.estado", "estado")
      .addSelect("COUNT(*)", "cantidad")
      .groupBy("sitio.estado")
      .getRawMany();
  }
}
