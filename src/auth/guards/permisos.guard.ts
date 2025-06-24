import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtPayload } from '../types/user-jwt-payload'; 

@Injectable()
export class PermisosGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtener los metadatos que definiste en el decorador @SetMetadata
    const rutaRequerida = this.reflector.get<string>('ruta', context.getHandler());
    const permisoRequerido = this.reflector.get<string>('permiso', context.getHandler());

    if (!rutaRequerida || !permisoRequerido) {
      return true; // No se requiere permiso explícito
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload;

    if (!user || !user.permisos) {
      throw new ForbiddenException('No autenticado o sin permisos');
    }

    const tienePermiso = user.permisos.some((permiso) => {
      return (
        permiso.ruta === rutaRequerida &&
        permiso[permisoRequerido as keyof typeof permiso] === true
      );
    });

    if (!tienePermiso) {
      throw new ForbiddenException('No tienes permiso para acceder a esta ruta');
    }

    return true;
  }
}
