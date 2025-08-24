import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from './../usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from '../permisos/entities/permiso.entity';
import { Opcion } from '../opciones/entities/opcion.entity';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { Usuarios } from '../usuarios/entities/usuarios.entity'; // <-- La importación clave

@Module({
  imports: [
    UsuariosModule,
    ConfigModule,
    // La corrección definitiva está aquí
    TypeOrmModule.forFeature([Permiso, Opcion, Usuarios]),

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
    TypeOrmModule,
  ],
})
export class AuthModule {}