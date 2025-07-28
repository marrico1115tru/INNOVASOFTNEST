import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './entities/Usuarios';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';
import { PermisoGuard } from './../auth/guards/permiso.guard';

@UseGuards(JwtGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // ✅ Obtener todos los usuarios
  @Get()
  findAll(): Promise<Usuarios[]> {
    return this.usuariosService.findAll();
  }

  // ✅ Estadísticas mensuales por rol
  @Get('estadisticas/mensuales-por-rol')
  getEstadisticasMensualesPorRol() {
    return this.usuariosService.getEstadisticasMensualesPorRol();
  }

  // ✅ Usuarios con más solicitudes
  @Get('usuarios-top-solicitudes')
  getUsuariosTopSolicitudes() {
    return this.usuariosService.getUsuariosConMayorUsoProductos();
  }

  // ✅ Distribución de usuarios por rol
  @Get('estadisticas/por-rol')
  getDistribucionPorRol() {
    return this.usuariosService.obtenerDistribucionUsuariosPorRol();
  }

  // ✅ Obtener datos del usuario autenticado desde el token
  @Get('perfil')
  getPerfil(@User() user: any) {
    return {
      message: '✅ Usuario autenticado',
      user,
    };
  }

  // ✅ Obtener un usuario por ID (DEBE IR AL FINAL)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuarios> {
    return this.usuariosService.findOne(id);
  }

  // ✅ Crear un nuevo usuario
  @Post()
  create(@Body() data: Partial<Usuarios>): Promise<Usuarios> {
    return this.usuariosService.create(data);
  }

  // ✅ Actualizar un usuario por ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Usuarios>
  ): Promise<Usuarios> {
    return this.usuariosService.update(id, data);
  }

  // ✅ Eliminar un usuario por ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usuariosService.remove(id);
  }
}
