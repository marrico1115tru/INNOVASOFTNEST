import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { Permiso } from './entities/permiso';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';

@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  // ✅ Ruta protegida por token
  @UseGuards(JwtGuard, PermisoGuard)
  @Get('rol/:idRol')
  async obtenerPermisosPorRol(@Param('idRol') idRol: string) {
    const permisos = await this.permisosService.obtenerPorRol(+idRol);
    return {
      message: `Permisos del rol ${idRol}`,
      data: permisos,
    };
  }

  // ❌ Ruta pública (NO REQUIERE autenticación)
  @UseGuards(JwtGuard)
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

  // ✅ Resto de rutas protegidas por JWT
  @UseGuards(JwtGuard)
  @Get()
  findAll(): Promise<Permiso[]> {
    return this.permisosService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Permiso> {
    return this.permisosService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() permisoData: Partial<Permiso>, @User() user: any): Promise<Permiso> {
    // Puedes usar user.idUsuario si necesitas asociar el permiso al creador
    return this.permisosService.create(permisoData);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() permisoData: Partial<Permiso>,
  ): Promise<Permiso> {
    return this.permisosService.update(+id, permisoData);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.permisosService.remove(+id);
  }

  // Ruta opcional para verificar autenticación
  @UseGuards(JwtGuard)
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
