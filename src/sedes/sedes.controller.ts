import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { SedesService } from './sedes.service';
import { Sedes } from './entities/Sedes';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('sedes')
@UseGuards(PermisosGuard)
export class SedesController {
  constructor(private readonly sedesService: SedesService) {}

  @Get()
  @RutaProtegida({ ruta: '/sedes', accion: 'puede_ver' })
  findAll(): Promise<Sedes[]> {
    return this.sedesService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/sedes', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<Sedes> {
    return this.sedesService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/sedes', accion: 'puede_crear' })
  create(@Body() data: Partial<Sedes>): Promise<Sedes> {
    return this.sedesService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/sedes', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<Sedes>): Promise<Sedes> {
    return this.sedesService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/sedes', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.sedesService.remove(+id);
  }
}