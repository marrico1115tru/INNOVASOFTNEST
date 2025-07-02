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
  Req,
} from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { Permiso } from './entities/permiso';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Request } from 'express';

@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}


  @Get('modulos/:idRol')
async getModulosPorRol(@Param('idRol') idRol: number) {
  return this.permisosService.obtenerModulosPorRol(idRol);
}

  // ✅ Obtener permisos por rol (protección JWT + permisos)
  @UseGuards(JwtGuard, PermisoGuard)
  @Get('rol/:idRol')
  async obtenerPermisosPorRol(@Param('idRol') idRol: string) {
    const permisos = await this.permisosService.obtenerPorRol(+idRol);
    return {
      message: `Permisos del rol ${idRol}`,
      data: permisos,
    };
  }

  // ✅ Obtener permisos por ruta actual y rol
  @UseGuards(JwtGuard)
  @Get('por-ruta')
  async obtenerPermisosPorRuta(
    @Query('ruta') ruta: string,
    @Query('idRol') idRol: string,
  ) {
    const permiso = await this.permisosService.getPermisoPorRutaYRol(
      ruta,
      +idRol,
    );
    return {
      message: `Permisos para la ruta ${ruta}`,
      data: permiso,
    };
  }

  // ✅ Obtener todos los permisos (administrativo)
  @UseGuards(JwtGuard)
  @Get()
  async findAll(): Promise<Permiso[]> {
    return this.permisosService.findAll();
  }

  // ✅ Obtener un permiso por ID
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Permiso> {
    return this.permisosService.findOne(+id);
  }

  // ✅ Crear un nuevo permiso
  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() permisoData: Partial<Permiso>,
    @User() user: any,
  ): Promise<Permiso> {
    return this.permisosService.create(permisoData);
  }

  // ✅ Actualizar permiso
  @UseGuards(JwtGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() permisoData: Partial<Permiso>,
  ): Promise<Permiso> {
    return this.permisosService.update(+id, permisoData);
  }

  // ✅ Eliminar permiso
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.permisosService.remove(+id);
  }

  // ✅ Ruta para verificar sesión activa
  @UseGuards(JwtGuard)
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
