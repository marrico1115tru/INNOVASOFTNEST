import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
//SE ACTUALIZO PARA QUE SOLO VALIDE EL TOKEN, LA VALIDACION DE LAS RUTAS YA NO FUNCIONA, SE VALIDA POR PERMISOS DEL ROL, EN PERMISOS.SERVICES.
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.token;

    if (!token) throw new UnauthorizedException('Token no encontrado');

    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) throw new UnauthorizedException('JWT_SECRET no definido');

    try {
      const decoded = jwt.verify(token, secret) as any;
      if (!decoded?.rol?.id) throw new UnauthorizedException('Rol inválido');

      request['user'] = decoded;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
