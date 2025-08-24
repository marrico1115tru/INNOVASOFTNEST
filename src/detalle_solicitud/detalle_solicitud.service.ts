import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleSolicitud } from './entities/DetalleSolicitud.entity';

@Injectable()
export class DetalleSolicitudService {
  constructor(
    @InjectRepository(DetalleSolicitud)
    private readonly detalleRepo: Repository<DetalleSolicitud>,
  ) {}

  findAll(): Promise<DetalleSolicitud[]> {
    return this.detalleRepo.find({
      relations: ['idProducto', 'idSolicitud'],
    });
  }

  async findOne(id: number): Promise<DetalleSolicitud> {
    const detalle = await this.detalleRepo.findOne({
      where: { id },
      relations: ['idProducto', 'idSolicitud'],
    });

    if (!detalle) {
      throw new NotFoundException(`Detalle con ID ${id} no encontrado`);
    }

    return detalle;
  }

  create(data: Partial<DetalleSolicitud>): Promise<DetalleSolicitud> {
    const nuevo = this.detalleRepo.create(data);
    return this.detalleRepo.save(nuevo);
  }

  async update(id: number, data: Partial<DetalleSolicitud>): Promise<DetalleSolicitud> {
    const detalle = await this.findOne(id);
    Object.assign(detalle, data);
    return this.detalleRepo.save(detalle);
  }

  async remove(id: number): Promise<void> {
    const detalle = await this.findOne(id);
    await this.detalleRepo.remove(detalle);
  }
}
