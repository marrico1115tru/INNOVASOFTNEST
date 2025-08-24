import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntregaMaterial } from './entities/EntregaMaterial.entity';

@Injectable()
export class EntregaMaterialService {
  constructor(
    @InjectRepository(EntregaMaterial)
    private readonly entregaRepo: Repository<EntregaMaterial>,
  ) {}

  findAll(): Promise<EntregaMaterial[]> {
    return this.entregaRepo.find({
      relations: ['idFichaFormacion', 'idSolicitud', 'idUsuarioResponsable', 'movimientos'],
    });
  }

  async findOne(id: number): Promise<EntregaMaterial> {
    const entrega = await this.entregaRepo.findOne({
      where: { id },
      relations: ['idFichaFormacion', 'idSolicitud', 'idUsuarioResponsable', 'movimientos'],
    });

    if (!entrega) {
      throw new NotFoundException(`Entrega con ID ${id} no encontrada`);
    }

    return entrega;
  }

  create(data: Partial<EntregaMaterial>): Promise<EntregaMaterial> {
    const nueva = this.entregaRepo.create(data);
    return this.entregaRepo.save(nueva);
  }

  async update(id: number, data: Partial<EntregaMaterial>): Promise<EntregaMaterial> {
    const entrega = await this.findOne(id);
    Object.assign(entrega, data);
    return this.entregaRepo.save(entrega);
  }

  async remove(id: number): Promise<void> {
    const entrega = await this.findOne(id);
    await this.entregaRepo.remove(entrega);
  }
}
