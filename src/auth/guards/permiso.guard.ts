import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { PermisosService } from './../../permisos/permisos.service'; // ajusta según tu proyecto

@Injectable()
export class PermisoGuard implements CanActivate {
  constructor(private readonly permisosService: PermisosService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as any;

    if (!user?.rol?.id) {
      throw new ForbiddenException('No se encontró el rol del usuario');
    }

    const ruta = request.route.path;
    const metodo = request.method;

    const permiso = await this.permisosService.getPermisoPorRutaYRol(
      ruta,
      user.rol.id,
    );

    let tienePermiso = false;

    switch (metodo) {
      case 'GET':
        tienePermiso = permiso.puedeVer;
        break;
      case 'POST':
        tienePermiso = permiso.puedeCrear;
        break;
      case 'PUT':
      case 'PATCH':
        tienePermiso = permiso.puedeEditar;
        break;
      case 'DELETE':
        tienePermiso = permiso.puedeEliminar;
        break;
    }

    if (!tienePermiso) {
      throw new ForbiddenException('No tienes permisos para esta acción');
    }

    return true;
  }
}
