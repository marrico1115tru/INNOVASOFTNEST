import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Productos } from './entities/Productos';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll(): Promise<Productos[]> {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Productos> {
    return this.productosService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Productos>): Promise<Productos> {
    return this.productosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Productos>): Promise<Productos> {
    return this.productosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productosService.remove(+id);
  }
}
