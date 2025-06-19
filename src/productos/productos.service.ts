import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos } from './entities/Productos';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private readonly productosRepo: Repository<Productos>,
  ) {}

  findAll(): Promise<Productos[]> {
    return this.productosRepo.find({
      relations: ['idCategoria', 'inventarios', 'detalleSolicituds'],
    });
  }

  async findOne(id: number): Promise<Productos> {
    const producto = await this.productosRepo.findOne({
      where: { id },
      relations: ['idCategoria', 'inventarios', 'detalleSolicituds'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return producto;
  }

  create(data: Partial<Productos>): Promise<Productos> {
    const nuevo = this.productosRepo.create(data);
    return this.productosRepo.save(nuevo);
  }

  async update(id: number, data: Partial<Productos>): Promise<Productos> {
    const producto = await this.findOne(id);
    Object.assign(producto, data);
    return this.productosRepo.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productosRepo.remove(producto);
  }
}
