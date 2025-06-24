import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PermisosModule } from 'src/permisos/permisos.module'; // 👈 IMPORTACIÓN NECESARIA

@Module({
  imports: [
    UsuariosModule,
    PermisosModule, // 👈 AGREGA AQUÍ EL MÓDULO DE PERMISOS
    JwtModule.register({
      secret: 'SECRET_JWT_KEY', // cámbialo en producción
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
