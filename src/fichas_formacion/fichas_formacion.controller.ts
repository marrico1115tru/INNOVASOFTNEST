import { FichasFormacionService } from './fichas_formacion.service';
import { FichasFormacion } from './entities/FichasFormacion';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';

@Controller('fichas-formacion')
@UseGuards(PermisosGuard)
export class FichasFormacionController {
  constructor(private readonly fichasService: FichasFormacionService) {}

  @Get()
  @RutaProtegida({ ruta: '/fichas-formacion', accion: 'puede_ver' })
  findAll(): Promise<FichasFormacion[]> {
    return this.fichasService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/fichas-formacion', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<FichasFormacion> {
    return this.fichasService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/fichas-formacion', accion: 'puede_crear' })
  create(@Body() data: Partial<FichasFormacion>): Promise<FichasFormacion> {
    return this.fichasService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/fichas-formacion', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<FichasFormacion>): Promise<FichasFormacion> {
    return this.fichasService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/fichas-formacion', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.fichasService.remove(+id);
  }
}