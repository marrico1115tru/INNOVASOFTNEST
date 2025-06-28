import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { OpcionesService } from './opciones.service';
import { Opcion } from './entities/opcion';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) // 🔐 Protege todas las rutas del controlador
@Controller('opciones')
export class OpcionesController {
  constructor(private readonly opcionesService: OpcionesService) {}

  @Get()
  findAll(): Promise<Opcion[]> {
    return this.opcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Opcion> {
    return this.opcionesService.findOne(+id);
  }

  @Post()
  create(@Body() opcionData: Partial<Opcion>, @User() user: any): Promise<Opcion> {
    // Puedes usar user.idUsuario si quieres guardar el creador de la opción
    return this.opcionesService.create(opcionData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() opcionData: Partial<Opcion>,
  ): Promise<Opcion> {
    return this.opcionesService.update(+id, opcionData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.opcionesService.remove(+id);
  }

  // Ruta opcional para verificar que el decorador @User() funciona
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
