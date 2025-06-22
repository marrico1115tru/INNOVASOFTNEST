import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimientos } from './entities/Movimientos';
import { Inventario } from './../inventario/entities/Inventario';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimientos)
    private readonly movimientosRepo: Repository<Movimientos>,

    @InjectRepository(Inventario)
    private readonly inventarioRepo: Repository<Inventario>,
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

  async create(data: Partial<Movimientos>): Promise<Movimientos> {
    // Validación de campos requeridos
    if (!data.tipoMovimiento || !['ENTRADA', 'SALIDA'].includes(data.tipoMovimiento)) {
      throw new Error('El tipoMovimiento debe ser ENTRADA o SALIDA');
    }

    if (data.cantidad === undefined || data.cantidad <= 0) {
      throw new Error('La cantidad es obligatoria y debe ser mayor que 0');
    }

    if (!data.idProductoInventario || !data.idProductoInventario.idProductoInventario) {
      throw new Error('idProductoInventario es obligatorio');
    }

    // Obtener inventario
    const inventario = await this.inventarioRepo.findOne({
      where: { idProductoInventario: data.idProductoInventario.idProductoInventario },
    });

    if (!inventario) {
      throw new NotFoundException('Inventario no encontrado');
    }

    // Actualizar el stock
    if (data.tipoMovimiento === 'ENTRADA') {
      inventario.stock += data.cantidad;
    } else if (data.tipoMovimiento === 'SALIDA') {
      if (inventario.stock < data.cantidad) {
        throw new Error('Stock insuficiente para salida');
      }
      inventario.stock -= data.cantidad;
    }

    // Guardar el inventario actualizado
    await this.inventarioRepo.save(inventario);

    // Guardar el movimiento
    const nuevoMovimiento = this.movimientosRepo.create(data);
    return this.movimientosRepo.save(nuevoMovimiento);
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
