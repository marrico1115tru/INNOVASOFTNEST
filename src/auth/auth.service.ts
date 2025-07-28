import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from './../permisos/entities/permiso';
import { Opcion } from './../opciones/entities/opcion';
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  private codigosVerificacion = new Map<string, { codigo: string; expira: Date }>();

  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,

    @InjectRepository(Permiso)
    private readonly permisosRepository: Repository<Permiso>,
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

    // 🔑 Obtener permisos
    const permisos = await this.permisosRepository.find({
      where: { rol: { id: user.rol.id } },
      relations: ['opcion'],
    });

    const opciones = permisos.map(p => ({
      id: p.opcion.id,
      nombre: p.opcion.nombre,
      ruta: p.opcion.ruta,
      visible: p.opcion.visible,
    }));

    const payload = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: {
        id: user.rol.id,
        nombre: user.rol.nombreRol,
      },
      permisos: opciones,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: '✅ Login exitoso',
      access_token: token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol.nombreRol,
        permisos: opciones,
      },
    };
  }

  async enviarCorreoRecuperacion(email: string): Promise<boolean> {
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario || !usuario.email) return false;

    const codigo = randomInt(100000, 999999).toString();
    const expiracion = new Date(Date.now() + 15 * 60 * 1000);

    this.codigosVerificacion.set(email, { codigo, expira: expiracion });

    console.log(`📧 Código para ${email}: ${codigo}`);

    try {
      await this.mailerService.sendMail({
        to: usuario.email,
        subject: 'Recuperación de contraseña',
        html: `
          <p>Hola ${usuario.nombre || ''},</p>
          <p>Tu código de recuperación es: <b>${codigo}</b></p>
          <p>Este código expirará en 15 minutos.</p>
        `,
      });
      return true;
    } catch (error) {
      console.error('Error enviando correo:', error);
      return false;
    }
  }

  async verificarCodigoYActualizarPassword(
    email: string,
    codigo: string,
    nuevaPassword: string,
  ): Promise<void> {
    const codigoData = this.codigosVerificacion.get(email);

    if (!codigoData) {
      throw new UnauthorizedException('Código no encontrado');
    }

    if (new Date() > codigoData.expira) {
      this.codigosVerificacion.delete(email);
      throw new UnauthorizedException('Código expirado');
    }

    if (codigoData.codigo !== codigo) {
      throw new UnauthorizedException('Código incorrecto');
    }

    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!nuevaPassword || nuevaPassword.length < 6) {
      throw new BadRequestException('La contraseña debe tener al menos 6 caracteres');
    }

    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
    await this.usuarioService.updatePassword(usuario.id, hashedPassword);

    this.codigosVerificacion.delete(email);
    console.log(`✅ Contraseña actualizada para ${email}`);
  }
}
