import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { Inventario } from './entities/Inventario.entity';
import { UpdateStockDto } from './dto/update-stock.dto';
import { RegistrarMultipleDto } from './dto/registrar-multiple.dto';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';
import { CreateInventarioDto, UpdateInventarioDto } from './dto/inventario.dto';

@UseGuards(JwtGuard)
@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get()
  findAll(): Promise<Inventario[]> {
    return this.inventarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Inventario> {
    return this.inventarioService.findOne(+id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(
    @Body() data: CreateInventarioDto,
    @User() user: any,
  ): Promise<Inventario> {
    return this.inventarioService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() data: UpdateInventarioDto,
  ): Promise<Inventario> {
    return this.inventarioService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.inventarioService.remove(+id);
  }

  @Put(':id/mover-stock')
  moverStock(
    @Param('id') id: string,
    @Body() data: UpdateStockDto,
    @User() user: any,
  ): Promise<Inventario> {
    return this.inventarioService.moverStock(+id, data);
  }

  @Post('registrar-multiple')
  registrarMultiple(
    @Body() data: RegistrarMultipleDto,
    @User() user: any,
  ): Promise<Inventario[]> {
    return this.inventarioService.registrarMultiple(data);
  }

  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
