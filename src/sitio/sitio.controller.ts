import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { SitioService } from './sitio.service';
import { Sitio } from './entities/Sitio';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('sitio')
@UseGuards(PermisosGuard)
export class SitioController {
  constructor(private readonly sitioService: SitioService) {}

  @Get()
  @RutaProtegida({ ruta: '/sitio', accion: 'puede_ver' })
  findAll(): Promise<Sitio[]> {
    return this.sitioService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/sitio', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<Sitio> {
    return this.sitioService.findOne(+id);
  }

  @Get('estadisticas/por-estado')
  @RutaProtegida({ ruta: '/sitio', accion: 'puede_ver' })
  async obtenerEstadisticasPorEstado() {
    return await this.sitioService.contarSitiosPorEstado();
  }

  @Post()
  @RutaProtegida({ ruta: '/sitio', accion: 'puede_crear' })
  create(@Body() data: Partial<Sitio>): Promise<Sitio> {
    return this.sitioService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/sitio', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<Sitio>): Promise<Sitio> {
    return this.sitioService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/sitio', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.sitioService.remove(+id);
  }
}
