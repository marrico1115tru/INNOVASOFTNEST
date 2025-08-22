import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from './../usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from './../permisos/entities/permiso';
import { Opcion } from './../opciones/entities/opcion';
import { JwtGuard } from './../auth/guards/jwt.guard';

@Module({
  imports: [
    UsuariosModule,
    ConfigModule,
    TypeOrmModule.forFeature([Permiso, Opcion]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET')!,
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard],
  exports: [
    AuthService,
    JwtModule,
    JwtGuard,
    TypeOrmModule, // ✅ Agregado para que se pueda usar PermisoRepository en JwtGuard
  ],
})
export class AuthModule {}
