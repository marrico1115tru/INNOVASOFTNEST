import { 
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TipoSitioService } from './tipo_sitio.service';
import { TipoSitio } from './entities/TipoSitio.entity';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) // Protege todo el controlador
@Controller('tipo-sitio')
export class TipoSitioController {
  constructor(private readonly tipoSitioService: TipoSitioService) {}

  @Get()
  findAll(): Promise<TipoSitio[]> {
    return this.tipoSitioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TipoSitio> {
    return this.tipoSitioService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<TipoSitio>): Promise<TipoSitio> {
    return this.tipoSitioService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<TipoSitio>
  ): Promise<TipoSitio> {
    return this.tipoSitioService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tipoSitioService.remove(+id);
  }

  // Ruta opcional para probar el token y obtener datos del usuario autenticado
  @Get('usuario/perfil')
  getUserInfo(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
