import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { PermisosService } from 'src/permisos/permisos.service';
import { Usuarios } from 'src/usuarios/entities/Usuarios';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly permisosService: PermisosService,
  ) {}

  async validateUser(email: string, password: string): Promise<Usuarios> {
    const user = await this.usuarioService.findByEmail(email, {
      relations: ['rol'],
    });

    if (!user) {
      console.log('❌ Usuario no encontrado:', email);
      throw new UnauthorizedException('Usuario no encontrado');
    }

    console.log('✅ Usuario encontrado:', user.email);
    console.log('🔑 Contraseña ingresada:', password);
    console.log('🔐 Hash en BD:', user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('🔍 ¿Contraseña válida?', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return user;
  }

  async login(user: Usuarios, res: Response) {
    if (!user.rol) {
      throw new NotFoundException('Rol del usuario no encontrado');
    }

    const permisos = await this.permisosService.getPermisosPorRol(user.rol.id);

    if (!Array.isArray(permisos)) {
      throw new Error('El servicio de permisos no retornó una lista válida');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      idRol: user.rol.id,
    };

    const token = this.jwtService.sign(payload);

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // ✅ cambia a true si usas HTTPS
      maxAge: 1000 * 60 * 60 * 4, // 4 horas
    });

    return {
      usuario: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol.nombreRol,
      },
      permisos: permisos.map((permiso) => ({
        ruta: permiso.opcion?.rutaFrontend ?? null,
        puede_ver: permiso.puedeVer,
        puede_crear: permiso.puedeCrear,
        puede_editar: permiso.puedeEditar,
        puede_eliminar: permiso.puedeEliminar,
      })),
    };
  }

  logout(res: Response) {
    res.clearCookie('token');
    return { message: 'Sesión cerrada' };
  }
}
