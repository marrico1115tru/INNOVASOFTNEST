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
import { Permiso } from './entities/permiso.entity';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';
import { Request } from 'express';
import { UpdatePermisoMasivoDto } from './dto/update-permisos-masivo.dto';

@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}


@Put('/actualizar-masivo')
async actualizarMasivo(@Body() body: UpdatePermisoMasivoDto) {
  return this.permisosService.actualizarPermisosMasivo(body.permisos);
}


  @UseGuards(JwtGuard)
  @Get('modulos/:idRol')
async getModulosPorRol(@Param('idRol') idRol: number) {
  return this.permisosService.obtenerModulosPorRol(idRol);
}

  
  @UseGuards(JwtGuard)
  @Get('rol/:idRol')
  async obtenerPermisosPorRol(@Param('idRol') idRol: string) {
    const permisos = await this.permisosService.obtenerPorRol(+idRol);
    return {
      message: `Permisos del rol ${idRol}`,
      data: permisos,
    };
  }


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


  @UseGuards(JwtGuard)
  @Get()
  async findAll(): Promise<Permiso[]> {
    return this.permisosService.findAll();
  }

 
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Permiso> {
    return this.permisosService.findOne(+id);
  }

 
  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() permisoData: Partial<Permiso>,
    @User() user: any,
  ): Promise<Permiso> {
    return this.permisosService.create(permisoData);
  }


  @UseGuards(JwtGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() permisoData: Partial<Permiso>,
  ): Promise<Permiso> {
    return this.permisosService.update(+id, permisoData);
  }


  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.permisosService.remove(+id);
  }

  @UseGuards(JwtGuard)
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
  
}
