// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token desde "Authorization: Bearer <token>"
      ignoreExpiration: false, // Rechaza tokens expirados
      secretOrKey: process.env.JWT_SECRET || 'SECRET_JWT_KEY', // ⚠️ Usa variable de entorno en producción
    });
  }

  // El resultado de esta función será lo que se asigna a req.user
  async validate(payload: any) {
    return {
      idUsuario: payload.sub,        // ID del usuario
      email: payload.email,          // Email
      idRol: payload.idRol ?? payload.rol, // Rol del usuario (por compatibilidad)
      permisos: payload.permisos || [],   // Permisos para el PermisosGuard
    };
  }
}
