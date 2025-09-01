import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './entities/Inventario.entity';
import { UpdateStockDto } from './dto/update-stock.dto';
import { RegistrarMultipleDto } from './dto/registrar-multiple.dto';
import { CreateInventarioDto, UpdateInventarioDto } from './dto/inventario.dto';

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

  async create(data: CreateInventarioDto): Promise<Inventario> {
    const nuevo = this.inventarioRepo.create({
      stock: data.stock,
      placaSena: data.placaSena ?? undefined,
      idProducto: { id: data.idProductoId } as any,
      fkSitio: { id: data.fkSitioId } as any,
      fechaEntrada: data.fechaEntrada,
      fechaSalida: undefined,
    });
    return this.inventarioRepo.save(nuevo);
  }

  async update(id: number, data: UpdateInventarioDto): Promise<Inventario> {
    const inventario = await this.findOne(id);
    if (data.idProductoId !== undefined)
      inventario.idProducto = { id: data.idProductoId } as any;
    if (data.fkSitioId !== undefined)
      inventario.fkSitio = { id: data.fkSitioId } as any;
    if (data.placaSena !== undefined) inventario.placaSena = data.placaSena;
    if (data.stock !== undefined) inventario.stock = data.stock;
    if (data.fechaEntrada !== undefined) inventario.fechaEntrada = data.fechaEntrada;
    if (data.fechaSalida !== undefined) inventario.fechaSalida = data.fechaSalida ?? undefined;
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

  async registrarMultiple(data: RegistrarMultipleDto): Promise<Inventario[]> {
    const inventarios: Inventario[] = [];
    for (const placa of data.placasSena) {
      if (!placa || placa.trim() === '') {
        throw new Error('Cada placa SENA es obligatoria y no puede estar vacía');
      }
      const nuevo = this.inventarioRepo.create({
        idProducto: { id: data.idProducto } as any,
        fkSitio: { id: data.fkSitio } as any,
        placaSena: placa,
        stock: 1,
        fechaEntrada: new Date().toISOString().slice(0, 10),
        fechaSalida: undefined,
      });
      const guardado = await this.inventarioRepo.save(nuevo);
      inventarios.push(guardado);
    }
    return inventarios;
  }
}
