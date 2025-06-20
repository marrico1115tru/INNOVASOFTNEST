import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Productos } from './entities/Productos';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private readonly productosRepo: Repository<Productos>,
  ) {}

  // Obtener todos los productos
  findAll(): Promise<Productos[]> {
    return this.productosRepo.find({
      relations: ['idCategoria', 'inventarios', 'detalleSolicituds'],
    });
  }

  // Obtener un solo producto por ID
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

  // Crear un nuevo producto
  create(data: Partial<Productos>): Promise<Productos> {
    const nuevo = this.productosRepo.create(data);
    return this.productosRepo.save(nuevo);
  }

  // Actualizar un producto existente
  async update(id: number, data: Partial<Productos>): Promise<Productos> {
    const producto = await this.findOne(id);
    Object.assign(producto, data);
    return this.productosRepo.save(producto);
  }

  // Eliminar un producto
  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productosRepo.remove(producto);
  }

  // Obtener productos vencidos
  async obtenerProductosVencidos(): Promise<Productos[]> {
    const fechaActual = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
    return this.productosRepo.find({
      where: {
        fechaVencimiento: LessThan(fechaActual),
      },
      relations: ['idCategoria', 'inventarios', 'detalleSolicituds'],
    });
  }

  // Obtener productos más solicitados (por cantidad total)
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
    .orderBy('"totalSolicitado"', 'DESC') // ← ✅ comillas aquí
    .getRawMany();
}



}
