import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(private readonly usuarioService: UsuariosService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usuarioService.findByEmail(email);

    console.log('🔍 Email recibido:', email);
    console.log('🔐 Contraseña enviada:', password);
    console.log('🗄️ Contraseña almacenada:', user.password);
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('✅ ¿Contraseña válida?', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return user;
  }
}
