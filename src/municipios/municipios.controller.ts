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
import { MunicipiosService } from './municipios.service';
import { Municipios } from './entities/Municipios';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) // 🔐 Protección de todas las rutas del controlador
@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Get()
  findAll(): Promise<Municipios[]> {
    return this.municipiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Municipios> {
    return this.municipiosService.findOne(+id);
  }

  @Post()
  create(
    @Body() data: Partial<Municipios>,
    @User() user: any, // 👤 Puedes usar user.idUsuario si necesitas registrar quién crea
  ): Promise<Municipios> {
    return this.municipiosService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Municipios>,
  ): Promise<Municipios> {
    return this.municipiosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.municipiosService.remove(+id);
  }

  // Ruta opcional para verificar el decorador @User()
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
