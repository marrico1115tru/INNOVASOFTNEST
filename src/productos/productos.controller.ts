import { Controller, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Productos } from './entities/Productos';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('productos')
@UseGuards(PermisosGuard)
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  @RutaProtegida({ ruta: '/productos', accion: 'puede_ver' })
  findAll(): Promise<Productos[]> {
    return this.productosService.findAll();
  }

  @Get('solicitados-por-usuario')
  @RutaProtegida({ ruta: '/productos', accion: 'puede_ver' })
  getCantidadSolicitadaPorUsuario(): Promise<
    { idUsuario: number; nombreCompleto: string; totalSolicitado: number }[]
  > {
    return this.productosService.obtenerCantidadSolicitadaPorUsuario();
  }

  @Get('mayor-movimiento')
  @RutaProtegida({ ruta: '/productos', accion: 'puede_ver' })
  async obtenerMayorMovimiento() {
    return await this.productosService.obtenerProductosConMayorMovimiento();
  }

  @Get('por-sitio')
  @RutaProtegida({ ruta: '/productos', accion: 'puede_ver' })
  obtenerPorSitio() {
    return this.productosService.obtenerProductosPorSitio();
  }
}
