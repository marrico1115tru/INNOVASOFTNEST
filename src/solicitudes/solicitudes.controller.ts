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
import { SolicitudesService } from './solicitudes.service';
import { Solicitudes } from './entities/Solicitudes';
import { JwtGuard } from './../auth/../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) 
@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Get()
  findAll(): Promise<Solicitudes[]> {
    return this.solicitudesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Solicitudes> {
    return this.solicitudesService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Solicitudes>): Promise<Solicitudes> {
    return this.solicitudesService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Solicitudes>,
  ): Promise<Solicitudes> {
    return this.solicitudesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.solicitudesService.remove(+id);
  }

  // Ruta de prueba para obtener datos del usuario autenticado
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
