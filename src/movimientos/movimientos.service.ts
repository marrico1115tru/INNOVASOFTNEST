import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimientos } from './entities/Movimientos';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimientos)
    private readonly movimientosRepo: Repository<Movimientos>,
  ) {}

  findAll(): Promise<Movimientos[]> {
    return this.movimientosRepo.find({
      relations: ['idEntrega', 'idProductoInventario'],
    });
  }

  async findOne(id: number): Promise<Movimientos> {
    const movimiento = await this.movimientosRepo.findOne({
      where: { id },
      relations: ['idEntrega', 'idProductoInventario'],
    });

    if (!movimiento) {
      throw new NotFoundException(`Movimiento con ID ${id} no encontrado`);
    }

    return movimiento;
  }

  create(data: Partial<Movimientos>): Promise<Movimientos> {
    const nuevo = this.movimientosRepo.create(data);
    return this.movimientosRepo.save(nuevo);
  }

  async update(id: number, data: Partial<Movimientos>): Promise<Movimientos> {
    const movimiento = await this.findOne(id);
    Object.assign(movimiento, data);
    return this.movimientosRepo.save(movimiento);
  }

  async remove(id: number): Promise<void> {
    const movimiento = await this.findOne(id);
    await this.movimientosRepo.remove(movimiento);
  }
}
