// src/usuarios/usuarios.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './entities/Usuarios';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, PermisosGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get('perfil')
  @RutaProtegida({ ruta: '/usuarios/perfil', accion: 'puede_ver' })
  getPerfil(@Req() req) {
    return {
      message: 'Perfil cargado correctamente',
      usuario: req.user, // { idUsuario, email, idRol }
    };
  }

  @Get()
  @RutaProtegida({ ruta: '/usuarios', accion: 'puede_ver' })
  findAll(): Promise<Usuarios[]> {
    return this.usuariosService.findAll();
  }

  @Get('estadisticas/mensuales-por-rol')
  @RutaProtegida({ ruta: '/usuarios/estadisticas/mensuales-por-rol', accion: 'puede_ver' })
  getEstadisticasMensualesPorRol() {
    return this.usuariosService.getEstadisticasMensualesPorRol();
  }

  @Get('usuarios-top-solicitudes')
  @RutaProtegida({ ruta: '/usuarios/usuarios-top-solicitudes', accion: 'puede_ver' })
  getUsuariosTopSolicitudes() {
    return this.usuariosService.getUsuariosConMayorUsoProductos();
  }

  @Get('estadisticas/por-rol')
  @RutaProtegida({ ruta: '/usuarios/estadisticas/por-rol', accion: 'puede_ver' })
  getDistribucionPorRol(): Promise<{ nombreRol: string; cantidad: number }[]> {
    return this.usuariosService.obtenerDistribucionUsuariosPorRol();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/usuarios/:id', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<Usuarios> {
    return this.usuariosService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/usuarios', accion: 'puede_crear' })
  create(@Body() data: Partial<Usuarios>): Promise<Usuarios> {
    return this.usuariosService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/usuarios/:id', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<Usuarios>): Promise<Usuarios> {
    return this.usuariosService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/usuarios/:id', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.usuariosService.remove(+id);
  }
}
