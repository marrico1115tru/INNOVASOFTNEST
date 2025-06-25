import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { Permiso } from './entities/permiso';

@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  // ❌ Ya no requiere autenticación
  @Get('por-ruta')
  async obtenerPermisosPorRuta(
    @Query('ruta') ruta: string,
    @Query('idRol') idRol: string,
  ) {
    const permiso = await this.permisosService.getPermisoPorRutaYRol(ruta, +idRol);
    return {
      message: `Permisos para la ruta ${ruta}`,
      data: permiso,
    };
  }

  @Get()
  findAll(): Promise<Permiso[]> {
    return this.permisosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Permiso> {
    return this.permisosService.findOne(+id);
  }

  @Post()
  create(@Body() permisoData: Partial<Permiso>): Promise<Permiso> {
    return this.permisosService.create(permisoData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() permisoData: Partial<Permiso>,
  ): Promise<Permiso> {
    return this.permisosService.update(+id, permisoData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.permisosService.remove(+id);
  }
}
