import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriasProductos } from './entities/CategoriasProductos';

@Injectable()
export class CategoriasProductosService {
  constructor(
    @InjectRepository(CategoriasProductos)
    private readonly categoriaRepo: Repository<CategoriasProductos>,
  ) {}

  findAll(): Promise<CategoriasProductos[]> {
    return this.categoriaRepo.find({
      relations: ['productos'],
    });
  }

  async findOne(id: number): Promise<CategoriasProductos> {
    const categoria = await this.categoriaRepo.findOne({
      where: { id },
      relations: ['productos'],
    });

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return categoria;
  }

  create(data: Partial<CategoriasProductos>): Promise<CategoriasProductos> {
    const nueva = this.categoriaRepo.create(data);
    return this.categoriaRepo.save(nueva);
  }

  async update(id: number, data: Partial<CategoriasProductos>): Promise<CategoriasProductos> {
    const categoria = await this.findOne(id);
    Object.assign(categoria, data);
    return this.categoriaRepo.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);
    await this.categoriaRepo.remove(categoria);
  }
}
