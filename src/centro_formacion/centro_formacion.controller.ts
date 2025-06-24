import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { CentroFormacionService } from './centro_formacion.service';
import { CentroFormacion } from './entities/CentroFormacion';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('centro-formacion')
@UseGuards(PermisosGuard)
export class CentroFormacionController {
  constructor(private readonly centroService: CentroFormacionService) {}

  @Get()
  @RutaProtegida({ ruta: '/centro-formacion', accion: 'puede_ver' })
  findAll(): Promise<CentroFormacion[]> {
    return this.centroService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/centro-formacion', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<CentroFormacion> {
    return this.centroService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/centro-formacion', accion: 'puede_crear' })
  create(@Body() data: Partial<CentroFormacion>): Promise<CentroFormacion> {
    return this.centroService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/centro-formacion', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<CentroFormacion>): Promise<CentroFormacion> {
    return this.centroService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/centro-formacion', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.centroService.remove(+id);
  }
}