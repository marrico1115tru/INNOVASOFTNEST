// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          // Extraer token manualmente desde cookies
          return req?.cookies?.token || null;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SECRET_JWT_KEY',
    });
  }

  async validate(payload: any) {
    return {
      idUsuario: payload.sub,
      email: payload.email,
      idRol: payload.idRol ?? payload.rol,
      permisos: payload.permisos || [],
    };
  }
}
