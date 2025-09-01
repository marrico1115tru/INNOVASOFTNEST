import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, Between } from 'typeorm';
import { Productos } from './entities/Productos.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private readonly productosRepo: Repository<Productos>,
  ) {}

  findAll(): Promise<Productos[]> {
    return this.productosRepo.find({
      relations: ['idCategoria', 'inventarios', 'detalleSolicituds'],
    });
  }

  async findOne(id: number): Promise<Productos> {
    if (!id || isNaN(id)) {
      throw new BadRequestException(`El ID (${id}) no es válido.`);
    }

    const producto = await this.productosRepo.findOne({
      where: { id },
      relations: ['idCategoria', 'inventarios', 'detalleSolicituds'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return producto;
  }

  create(data: Partial<Productos>): Promise<Productos> {
    const nuevo = this.productosRepo.create(data);
    return this.productosRepo.save(nuevo);


  }

async obtenerReporteProductosCompleto() {
  return this.productosRepo
    .createQueryBuilder('producto')
    .leftJoinAndSelect('producto.inventarios', 'inventario')
    .leftJoinAndSelect('inventario.fkSitio', 'sitio')
    .leftJoin('producto.detalleSolicituds', 'detalleSolicitud')
    .leftJoin('detalleSolicitud.idSolicitud', 'solicitud')
    .leftJoin('solicitud.idUsuarioSolicitante', 'usuario')
    .select([
      'producto.id',
      'producto.nombre',
      'inventario.fechaEntrada',
      'inventario.fechaSalida',
      'sitio.nombre',
      'usuario.id',
      'usuario.nombre',
      'usuario.apellido',
      'detalleSolicitud.cantidadSolicitada',
      'detalleSolicitud.observaciones',
    ])
    .getMany();
}



  async obtenerProductosVencidos(): Promise<Productos[]> {
    const fechaActual = new Date().toISOString().split('T')[0];
    return this.productosRepo.find({
      where: {
        fechaVencimiento: LessThan(fechaActual),
      },
      relations: ['idCategoria', 'inventarios', 'detalleSolicituds'],
    });
  }

  

  async update(id: number, data: Partial<Productos>): Promise<Productos> {
    const producto = await this.findOne(id);
    Object.assign(producto, data);
    return this.productosRepo.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productosRepo.remove(producto);
  }

  

  async obtenerProductosMasSolicitados(limit: number = 5): Promise<any[]> {
    return this.productosRepo
      .createQueryBuilder('producto')
      .leftJoin('producto.detalleSolicituds', 'detalle')
      .select('producto.id', 'id')
      .addSelect('producto.nombre', 'nombre')
      .addSelect('SUM(detalle.cantidadSolicitada)', 'totalSolicitado')
      .groupBy('producto.id')
      .addGroupBy('producto.nombre')
      .orderBy('SUM(detalle.cantidadSolicitada)', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async obtenerCantidadSolicitadaPorUsuario(): Promise<
    { idUsuario: number; nombreCompleto: string; totalSolicitado: number }[]
  > {
    return this.productosRepo
      .createQueryBuilder('producto')
      .leftJoin('producto.detalleSolicituds', 'detalle')
      .leftJoin('detalle.idSolicitud', 'solicitud')
      .leftJoin('solicitud.idUsuarioSolicitante', 'usuario')
      .select('usuario.id', 'idUsuario')
      .addSelect(`CONCAT(usuario.nombre, ' ', usuario.apellido)`, 'nombreCompleto')
      .addSelect('SUM(detalle.cantidadSolicitada)', 'totalSolicitado')
      .groupBy('usuario.id')
      .addGroupBy('usuario.nombre')
      .addGroupBy('usuario.apellido')
      .orderBy('"totalSolicitado"', 'DESC')
      .getRawMany();
  }

  async obtenerProductosConMayorMovimiento(): Promise<
    { nombre: string; totalMovimiento: number }[]
  > {
    return this.productosRepo
      .createQueryBuilder('producto')
      .leftJoin('producto.detalleSolicituds', 'detalle')
      .select('producto.nombre', 'nombre')
      .addSelect('COALESCE(SUM(detalle.cantidadSolicitada), 0)', 'totalMovimiento')
      .groupBy('producto.nombre')
      .orderBy('COALESCE(SUM(detalle.cantidadSolicitada), 0)', 'DESC')
      .limit(5)
      .getRawMany();
  }

  async obtenerProductosPorSitio(): Promise<
    { nombreSitio: string; nombreProducto: string; stock: number }[]
  > {
    return await this.productosRepo
      .createQueryBuilder('producto')
      .leftJoin('producto.inventarios', 'inventario')
      .leftJoin('inventario.fkSitio', 'sitio')
      .select('sitio.nombre', 'nombreSitio')
      .addSelect('producto.nombre', 'nombreProducto')
      .addSelect('SUM(inventario.stock)', 'stock')
      .groupBy('sitio.nombre')
      .addGroupBy('producto.nombre')
      .getRawMany();
  }

  async productosProximosAVencer() {
    const hoy = new Date();
    const dentroDe7Dias = new Date();
    dentroDe7Dias.setDate(hoy.getDate() + 7);

    const fechaInicio = hoy.toISOString().split('T')[0];
    const fechaFin = dentroDe7Dias.toISOString().split('T')[0];

    return this.productosRepo.find({
      where: {
        fechaVencimiento: Between(fechaInicio, fechaFin),
      },
      relations: ['inventarios', 'detalleSolicituds', 'idCategoria'],
      order: { fechaVencimiento: 'ASC' },
    });
  }
}
