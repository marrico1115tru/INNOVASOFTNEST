import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Productos } from './entities/Productos';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';
import { PermisoGuard } from 'src/auth/guards/permiso.guard';

@UseGuards(JwtGuard) 
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}


  @Get()
  findAll(): Promise<Productos[]> {
    return this.productosService.findAll();
  }

  @Get('vencidos')
  getProductosVencidos(): Promise<Productos[]> {
    return this.productosService.obtenerProductosVencidos();
  }

  @Get('solicitados-por-usuario')
  getCantidadSolicitadaPorUsuario(): Promise<
    { idUsuario: number; nombreCompleto: string; totalSolicitado: number }[]
  > {
    return this.productosService.obtenerCantidadSolicitadaPorUsuario();
  }

  @Get('mayor-movimiento')
  obtenerMayorMovimiento() {
    return this.productosService.obtenerProductosConMayorMovimiento();
  }

  @Get('por-sitio')
  obtenerPorSitio() {
    return this.productosService.obtenerProductosPorSitio();
  }

  @Get('proximos-vencer')
  productosProximosAVencer() {
    return this.productosService.productosProximosAVencer();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Productos> {
    return this.productosService.findOne(id);
  }

  @Post()
  create(
    @Body() body: Partial<Productos>,
    @User() user: any, // 
  ): Promise<Productos> {

    return this.productosService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<Productos>,
  ): Promise<Productos> {
    return this.productosService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productosService.remove(id);
  }

  // Ruta opcional para probar el decorador @User()
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
