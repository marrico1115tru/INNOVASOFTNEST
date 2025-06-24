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
import { TituladosService } from './titulados.service';
import { Titulados } from './entities/Titulados';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('titulados')
@UseGuards(JwtAuthGuard, PermisosGuard)
export class TituladosController {
  constructor(private readonly tituladosService: TituladosService) {}

  @Get()
  @RutaProtegida({ ruta: '/titulados', accion: 'puede_ver' })
  findAll(): Promise<Titulados[]> {
    return this.tituladosService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/titulados', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<Titulados> {
    return this.tituladosService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/titulados', accion: 'puede_crear' })
  create(@Body() data: Partial<Titulados>): Promise<Titulados> {
    return this.tituladosService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/titulados', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<Titulados>): Promise<Titulados> {
    return this.tituladosService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/titulados', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.tituladosService.remove(+id);
  }
}