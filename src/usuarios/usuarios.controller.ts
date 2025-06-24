import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './entities/Usuarios';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll(): Promise<Usuarios[]> {
    return this.usuariosService.findAll();
  }

  
  @Get('estadisticas/mensuales-por-rol')
  getEstadisticasMensualesPorRol() {
    return this.usuariosService.getEstadisticasMensualesPorRol();
  }

  @Get('usuarios-top-solicitudes')
async getUsuariosTopSolicitudes() {
  return this.usuariosService.getUsuariosConMayorUsoProductos();
}


  @Get('estadisticas/por-rol')
getDistribucionPorRol(): Promise<{ nombreRol: string; cantidad: number }[]> {
  return this.usuariosService.obtenerDistribucionUsuariosPorRol();
}


  @Get(':id')
  findOne(@Param('id') id: string): Promise<Usuarios> {
    return this.usuariosService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Usuarios>): Promise<Usuarios> {
    return this.usuariosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Usuarios>): Promise<Usuarios> {
    return this.usuariosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usuariosService.remove(+id);
  }
}
