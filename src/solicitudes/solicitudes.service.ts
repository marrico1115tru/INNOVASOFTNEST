import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitudes } from './entities/Solicitudes.entity';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitudes)
    private readonly solicitudesRepo: Repository<Solicitudes>,
  ) {}

  findAll(): Promise<Solicitudes[]> {
    return this.solicitudesRepo.find({
      relations: ['idUsuarioSolicitante', 'detalleSolicituds', 'entregaMaterials'],
    });
  }

  async findOne(id: number): Promise<Solicitudes> {
    const solicitud = await this.solicitudesRepo.findOne({
      where: { id },
      relations: ['idUsuarioSolicitante', 'detalleSolicituds', 'entregaMaterials'],
    });
    if (!solicitud) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }
    return solicitud;
  }

  create(data: Partial<Solicitudes>): Promise<Solicitudes> {
    const nueva = this.solicitudesRepo.create(data);
    return this.solicitudesRepo.save(nueva);
  }

  async update(id: number, data: Partial<Solicitudes>): Promise<Solicitudes> {
    const solicitud = await this.findOne(id);
    Object.assign(solicitud, data);
    return this.solicitudesRepo.save(solicitud);
  }

  async remove(id: number): Promise<void> {
    const solicitud = await this.findOne(id);
    await this.solicitudesRepo.remove(solicitud);
  }
}
