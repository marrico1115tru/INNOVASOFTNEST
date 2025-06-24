import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TipoSitioService } from './tipo_sitio.service';
import { TipoSitio } from './entities/TipoSitio';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('tipo-sitio')
@UseGuards(JwtAuthGuard, PermisosGuard)
export class TipoSitioController {
  constructor(private readonly tipoSitioService: TipoSitioService) {}

  @Get()
  @RutaProtegida({ ruta: '/tipo-sitio', accion: 'puede_ver' })
  findAll(): Promise<TipoSitio[]> {
    return this.tipoSitioService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/tipo-sitio', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<TipoSitio> {
    return this.tipoSitioService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/tipo-sitio', accion: 'puede_crear' })
  create(@Body() data: Partial<TipoSitio>): Promise<TipoSitio> {
    return this.tipoSitioService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/tipo-sitio', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<TipoSitio>): Promise<TipoSitio> {
    return this.tipoSitioService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/tipo-sitio', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.tipoSitioService.remove(+id);
  }
}