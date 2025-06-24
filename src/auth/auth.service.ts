import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { PermisosService } from 'src/permisos/permisos.service';
import { Usuarios } from 'src/usuarios/entities/Usuarios';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly permisosService: PermisosService,
  ) {}

  // Validar credenciales del usuario
  async validateUser(email: string, password: string): Promise<Usuarios> {
    const user = await this.usuarioService.findByEmail(email, {
      relations: ['rol'],
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return user;
  }

  // Generar token JWT con permisos embebidos
  async login(user: Usuarios) {
    if (!user.rol) {
      throw new NotFoundException('Rol del usuario no encontrado');
    }

    const permisos = await this.permisosService.getPermisosPorRol(user.rol.id);

    const permisosConRuta = permisos.map((permiso) => ({
      ruta: permiso.opcion?.rutaFrontend ?? null,
      puede_ver: permiso.puedeVer,
      puede_crear: permiso.puedeCrear,
      puede_editar: permiso.puedeEditar,
      puede_eliminar: permiso.puedeEliminar,
    }));

    const payload = {
      sub: user.id,
      email: user.email,
      idRol: user.rol.id,
      permisos: permisosConRuta,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login exitoso',
      accessToken: token,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol.nombreRol,
      },
      permisos: permisosConRuta,
    };
  }
}
