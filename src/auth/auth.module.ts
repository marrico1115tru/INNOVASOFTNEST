import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { PermisosModule } from 'src/permisos/permisos.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // Importamos el módulo de usuarios para validar credenciales
    UsuariosModule,

    // Importamos el módulo de permisos si necesitas enviar permisos desde el login
    PermisosModule,

    // Configuración del módulo JWT
    JwtModule.register({
      secret: 'SECRET_JWT_KEY', // ⚠️ Reemplazar por variable de entorno en producción
      signOptions: {
        expiresIn: '8h', // Duración del token JWT
      },
    }),
  ],
  controllers: [AuthController], // Controlador que maneja las rutas /auth/*
  providers: [
    AuthService,   // Servicio de autenticación
    JwtStrategy,   // Estrategia de validación de tokens
  ],
  exports: [
    AuthService,   // Exportamos para usarlo en otros módulos si es necesario
  ],
})
export class AuthModule {}
