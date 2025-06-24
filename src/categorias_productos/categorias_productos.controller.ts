import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { CategoriasProductosService } from './categorias_productos.service';
import { CategoriasProductos } from './entities/CategoriasProductos';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('categorias-productos')
@UseGuards(PermisosGuard)
export class CategoriasProductosController {
  constructor(private readonly categoriaService: CategoriasProductosService) {}

  @Get()
  @RutaProtegida({ ruta: '/categorias-productos', accion: 'puede_ver' })
  findAll(): Promise<CategoriasProductos[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/categorias-productos', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<CategoriasProductos> {
    return this.categoriaService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/categorias-productos', accion: 'puede_crear' })
  create(@Body() data: Partial<CategoriasProductos>): Promise<CategoriasProductos> {
    return this.categoriaService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/categorias-productos', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<CategoriasProductos>): Promise<CategoriasProductos> {
    return this.categoriaService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/categorias-productos', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriaService.remove(+id);
  }
}
