import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from './../permisos/entities/permiso';
import { Opcion } from './../opciones/entities/opcion';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,

    @InjectRepository(Permiso)
    private readonly permisosRepository: Repository<Permiso>,

    @InjectRepository(Opcion)
    private readonly opcionesRepository: Repository<Opcion>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usuarioService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Contraseña incorrecta');

    return user;
  }

  async login(user: any) {
    if (!user.rol?.id) {
      throw new UnauthorizedException('Usuario sin rol asignado');
    }

    // 👇 SOLO datos mínimos en el token
    const payload = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: {
        id: user.rol.id,
        nombre: user.rol.nombreRol,
      },
    };

    const token = await this.jwtService.signAsync(payload);

    // 👇 Solo devuelves el user y el token, los permisos se consultan en el guard
    const tokenData = {
      message: '✅ Login exitoso',
      access_token: token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol.nombreRol,
      },
    };

    console.log('✅ TOKEN ENVIADO:', token); // Por depuración

    return tokenData;
  }
}
