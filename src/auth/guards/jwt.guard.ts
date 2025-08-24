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
import { Permiso } from '../../permisos/entities/permiso.entity';

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

    if (!token) {
      throw new UnauthorizedException('Token no encontrado en cookies');
    }

    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET no está definido en .env');
    }

    try {
      const decoded = jwt.verify(token, secret) as any;
      request['user'] = decoded;

      const userRolId = decoded?.rol?.id;
      if (!userRolId) {
        throw new UnauthorizedException('Rol inválido en el token');
      }
      
      const requestedPath = request.path;

      console.log('\n--- 🛡️  INICIO VALIDACIÓN JWTGUARD 🛡️  ---');
      console.log(`[INFO] Usuario: ${decoded.email}, Rol ID: ${userRolId}`);
      console.log(`[INFO] Ruta de API solicitada: ${request.method} ${requestedPath}`);

      const rutasExcluidasDePermisos = [
        '/permisos/modulos',
        '/auth/profile',
        '/auth/refresh',
      ];

      const esRutaExcluida = rutasExcluidasDePermisos.some((ruta) =>
        requestedPath.startsWith(ruta),
      );

      if (esRutaExcluida) {
        console.log(`[OK] ✅ Ruta ${requestedPath} está excluida. Acceso concedido.`);
        console.log('--- 🛡️  FIN VALIDACIÓN JWTGUARD 🛡️  ---\n');
        return true;
      }

      const permisosDelRol = await this.permisosRepository.find({
        where: { rol: { id: userRolId } },
        relations: ['opcion'],
      });

      const rutasPermitidas = permisosDelRol.map(
        (p) => p.opcion?.rutaFrontend || '',
      ).filter(Boolean); // Filtra posibles valores nulos o vacíos
      
      console.log('[DB] El rol tiene permisos para estas rutas base de API:', rutasPermitidas);

      let permisoConcedido = false;
      for (const rutaBase of rutasPermitidas) {
        const match = requestedPath.startsWith(rutaBase);
        console.log(`[COMPROBANDO] ¿"${requestedPath}" empieza con "${rutaBase}"? -> ${match}`);
        if (match) {
          permisoConcedido = true;
          break; // Si encontramos una coincidencia, no necesitamos seguir buscando
        }
      }

      if (!permisoConcedido) {
        console.log(`[DENEGADO] ❌ El rol ${userRolId} no tiene permiso para la ruta ${requestedPath}.`);
        console.log('--- 🛡️  FIN VALIDACIÓN JWTGUARD 🛡️  ---\n');
        throw new ForbiddenException('No tienes permiso para acceder a este recurso.');
      }

      console.log(`[OK] ✅ Permiso encontrado para la ruta ${requestedPath}. Acceso concedido.`);
      console.log('--- 🛡️  FIN VALIDACIÓN JWTGUARD 🛡️  ---\n');
      return true;

    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      console.error(`[ERROR] ❌ Error en JwtGuard: ${error.message}`);
      throw new UnauthorizedException('Token inválido o expirado.');
    }
  }
}