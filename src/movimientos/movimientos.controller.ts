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
import { MovimientosService } from './../movimientos/movimientos.service';
import { Movimientos } from './entities/Movimientos.entity';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) 
@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Get()
  findAll(): Promise<Movimientos[]> {
    return this.movimientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movimientos> {
    return this.movimientosService.findOne(+id);
  }

  @Post()
  create(
    @Body() data: Partial<Movimientos>,
    @User() user: any, // 👤 Puedes usar user.idUsuario para guardar quién creó el movimiento
  ): Promise<Movimientos> {
    return this.movimientosService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Movimientos>,
  ): Promise<Movimientos> {
    return this.movimientosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.movimientosService.remove(+id);
  }

  // Ruta opcional para verificar el usuario autenticado
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
