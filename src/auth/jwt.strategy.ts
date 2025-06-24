import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_JWT_KEY', // En producción usa una variable segura
    });
  }

  async validate(payload: any) {
    return {
      idUsuario: payload.sub,
      email: payload.email,
      idRol: payload.idRol ?? payload.rol, // compatibilidad si guardaste como 'rol'
      permisos: payload.permisos || [], // 👈 NECESARIO para el PermisosGuard
    };
  }
}
