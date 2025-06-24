import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Productos } from './entities/Productos';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  // Obtener todos los productos
  @Get()
  findAll(): Promise<Productos[]> {
    return this.productosService.findAll();
  }
@Get('solicitados-por-usuario')
getCantidadSolicitadaPorUsuario(): Promise<
  { idUsuario: number; nombreCompleto: string; totalSolicitado: number }[]
> {
  return this.productosService.obtenerCantidadSolicitadaPorUsuario();
}


  @Get('mayor-movimiento')
async obtenerMayorMovimiento() {
  return await this.productosService.obtenerProductosConMayorMovimiento();
}

@Get('por-sitio')
obtenerPorSitio() {
  return this.productosService.obtenerProductosPorSitio();
}

// src/productos/productos.controller.ts

@Get('proximos-vencer')
async getProductosProximosAVencer(): Promise<Productos[]> {
  return this.productosService.productosProximosAVencer();
}


  // ✅ Productos más solicitados (antes del :id)
  @Get('mas-solicitados')
  getMasSolicitados(@Query('limit') limit?: string): Promise<any[]> {
    const top = limit ? parseInt(limit, 10) : 5;
    return this.productosService.obtenerProductosMasSolicitados(top);
  }

  // ✅ Productos vencidos (antes del :id)
  @Get('vencidos')
  getVencidos(): Promise<Productos[]> {
    return this.productosService.obtenerProductosVencidos();
  }

  // Obtener un producto por ID con validación
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Productos> {
    return this.productosService.findOne(id);
  }

  // Crear un nuevo producto
  @Post()
  create(@Body() data: Partial<Productos>): Promise<Productos> {
    return this.productosService.create(data);
  }

  // Actualizar un producto
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Productos>,
  ): Promise<Productos> {
    return this.productosService.update(id, data);
  }

  // Eliminar un producto
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productosService.remove(id);
  }



}
