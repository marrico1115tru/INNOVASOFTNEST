import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SitioService } from './sitio.service';
import { Sitio } from './entities/Sitio.entity';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) // 🔐 Protege todas las rutas del controlador
@Controller('sitio')
export class SitioController {
  constructor(private readonly sitioService: SitioService) {}

  @Get()
  findAll(): Promise<Sitio[]> {
    return this.sitioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Sitio> {
    return this.sitioService.findOne(+id);
  }

  @Get('estadisticas/por-estado')
  async obtenerEstadisticasPorEstado() {
    return await this.sitioService.contarSitiosPorEstado();
  }

  @Post()
  create(@Body() data: Partial<Sitio>): Promise<Sitio> {
    return this.sitioService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Sitio>,
  ): Promise<Sitio> {
    return this.sitioService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.sitioService.remove(+id);
  }

  // Ruta opcional para acceder a los datos del usuario autenticado
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
