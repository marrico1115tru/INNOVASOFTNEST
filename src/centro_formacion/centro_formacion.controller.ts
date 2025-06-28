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
import { CentroFormacionService } from './centro_formacion.service';
import { CentroFormacion } from './entities/CentroFormacion';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) // 🔐 Aplica el guard a todo el controlador
@Controller('centro-formacion')
export class CentroFormacionController {
  constructor(private readonly centroService: CentroFormacionService) {}

  @Get()
  findAll(): Promise<CentroFormacion[]> {
    return this.centroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CentroFormacion> {
    return this.centroService.findOne(+id);
  }

  @Post()
  create(
    @Body() data: Partial<CentroFormacion>,
    @User() user: any, // 👤 Puedes acceder al usuario autenticado si necesitas
  ): Promise<CentroFormacion> {
    return this.centroService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<CentroFormacion>,
  ): Promise<CentroFormacion> {
    return this.centroService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.centroService.remove(+id);
  }

  // Ruta opcional para verificar el usuario autenticado
  @Get('usuario/perfil')
  getPerfil(@User() user: any) {
    return {
      message: 'Usuario autenticado',
      user,
    };
  }
}
