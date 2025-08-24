import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './entities/Inventario.entity';
import { UpdateStockDto } from './dto/update-stock.dto';


@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepo: Repository<Inventario>,
  ) {}

  findAll(): Promise<Inventario[]> {
    return this.inventarioRepo.find({
      relations: ['fkSitio', 'idProducto', 'movimientos'],
    });
  }

  async findOne(id: number): Promise<Inventario> {
    const inventario = await this.inventarioRepo.findOne({
      where: { idProductoInventario: id },
      relations: ['fkSitio', 'idProducto', 'movimientos'],
    });

    if (!inventario) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }

    return inventario;
  }

  create(data: Partial<Inventario>): Promise<Inventario> {
    const nuevo = this.inventarioRepo.create(data);
    return this.inventarioRepo.save(nuevo);
  }

  async update(id: number, data: Partial<Inventario>): Promise<Inventario> {
    const inventario = await this.findOne(id);
    Object.assign(inventario, data);
    return this.inventarioRepo.save(inventario);
  }

  async remove(id: number): Promise<void> {
    const inventario = await this.findOne(id);
    await this.inventarioRepo.remove(inventario);
  }

  async moverStock(id: number, data: UpdateStockDto): Promise<Inventario> {
     const inventario = await this.findOne(id);
     
     const { tipo, cantidad } = data;
     
     if (tipo === 'ENTRADA') {
      
      inventario.stock += cantidad;
    
    } else {
      if (inventario.stock < cantidad) {
         throw new Error('Stock insuficiente para salida');
    }
    inventario.stock -= cantidad;
   }
    return this.inventarioRepo.save(inventario);
  }
}
