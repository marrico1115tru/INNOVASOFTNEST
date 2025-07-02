import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from 'src/permisos/entities/permiso';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(Permiso)
    private readonly permisosRepository: Repository<Permiso>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.token;

    console.log('TOKEN RECIBIDO:', token);
    if (!token) {
      throw new UnauthorizedException('Token no encontrado en cookies');
    }

    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET no está definido en .env');
    }

    try {
      // ✅ Decodificar el token
      const decoded = jwt.verify(token, secret) as any;

      const userRolId = decoded?.rol?.id;
      if (!userRolId) throw new UnauthorizedException('Rol inválido en token');

      // 🧠 Consultar permisos en base de datos
      const permisos = await this.permisosRepository.find({
        where: { rol: { id: userRolId } },
        relations: ['opcion'],
      });

      const permisosFormateados = permisos.map((permiso) => ({
        ruta: permiso.opcion?.rutaFrontend || '',
        puede_ver: permiso.puedeVer,
        puede_crear: permiso.puedeCrear,
        puede_editar: permiso.puedeEditar,
        puede_eliminar: permiso.puedeEliminar,
      }));

      const path = request.route?.path || request.url;
      const baseUrl = request.baseUrl || '';
      const fullRoute = `${baseUrl}${path}`;

      console.log('🛣️ Ruta solicitada:', fullRoute);
      console.log('🔑 Permisos cargados:', permisosFormateados);

      // Validar permisos
      const permisoRuta = permisosFormateados.find((p) =>
        fullRoute.startsWith(p.ruta)
      );

      if (!permisoRuta) {
        throw new ForbiddenException(
          'No tienes ningún permiso para acceder a esta ruta'
        );
      }

      if (!permisoRuta.puede_ver) {
        throw new ForbiddenException(
          'No tienes permiso de lectura (puede_ver) en esta ruta'
        );
      }

      // Adjuntar el usuario decodificado a la request
      request['user'] = decoded;

      return true;
    } catch (error) {
      console.error('❌ Error en verificación de token:', error.message);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
