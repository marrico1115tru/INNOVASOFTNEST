import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DetalleSolicitudService } from './detalle_solicitud.service';
import { DetalleSolicitud } from './entities/DetalleSolicitud.entity';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) // 🔐 Protege todas las rutas del controlador
@Controller('detalle-solicitud')
export class DetalleSolicitudController {
  constructor(private readonly detalleService: DetalleSolicitudService) {}

  @Get()
  findAll(): Promise<DetalleSolicitud[]> {
    return this.detalleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DetalleSolicitud> {
    return this.detalleService.findOne(+id);
  }

  @Post()
  create(
    @Body() data: Partial<DetalleSolicitud>,
    @User() user: any, // 👤 Puedes usar user.idUsuario si deseas registrar quién creó el detalle
  ): Promise<DetalleSolicitud> {
    return this.detalleService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<DetalleSolicitud>,
  ): Promise<DetalleSolicitud> {
    return this.detalleService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.detalleService.remove(+id);
  }

  // Ruta opcional para verificar el usuario autenticado
  @Get('usuario/perfil')
  getPerfilUsuario(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
