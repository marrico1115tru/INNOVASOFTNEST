import { MunicipiosService } from './municipios.service';
import { Municipios } from './entities/Municipios';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('municipios')
@UseGuards(PermisosGuard)
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Get()
  @RutaProtegida({ ruta: '/municipios', accion: 'puede_ver' })
  findAll(): Promise<Municipios[]> {
    return this.municipiosService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/municipios', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<Municipios> {
    return this.municipiosService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/municipios', accion: 'puede_crear' })
  create(@Body() data: Partial<Municipios>): Promise<Municipios> {
    return this.municipiosService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/municipios', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<Municipios>): Promise<Municipios> {
    return this.municipiosService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/municipios', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.municipiosService.remove(+id);
  }
}