import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CategoriasProductosService } from './categorias_productos.service';
import { CategoriasProductos } from './entities/CategoriasProductos';

@Controller('categorias-productos')
export class CategoriasProductosController {
  constructor(private readonly categoriaService: CategoriasProductosService) {}

  @Get()
  findAll(): Promise<CategoriasProductos[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CategoriasProductos> {
    return this.categoriaService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<CategoriasProductos>): Promise<CategoriasProductos> {
    return this.categoriaService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<CategoriasProductos>): Promise<CategoriasProductos> {
    return this.categoriaService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriaService.remove(+id);
  }
}
