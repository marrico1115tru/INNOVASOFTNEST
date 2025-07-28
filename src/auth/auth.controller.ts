import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
  Get,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    const tokenData = await this.authService.login(user);

    res.cookie('token', tokenData.access_token, {
      httpOnly: false,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });

    return {
      message: tokenData.message,
      user: tokenData.user,
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: '🚪 Sesión cerrada correctamente' };
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return req['user'];
  }

  // ✅ Ruta para enviar código de recuperación al correo
  @Post('recuperar')
  async recuperar(@Body('email') email: string) {
    const enviado = await this.authService.enviarCorreoRecuperacion(email);

    if (!enviado) {
      throw new NotFoundException('Correo no registrado');
    }

    return {
      message:
        'Si el correo está registrado, recibirás un mensaje con instrucciones para restablecer tu contraseña.',
    };
  }

  // ✅ Ruta para verificar el código y actualizar la contraseña
  @Post('verificar-codigo')
  async verificarCodigo(
    @Body() body: { email: string; codigo: string; nuevaPassword: string },
  ) {
    const { email, codigo, nuevaPassword } = body;

    await this.authService.verificarCodigoYActualizarPassword(
      email,
      codigo,
      nuevaPassword,
    );

    return {
      message: '✅ Contraseña actualizada correctamente',
    };
  }
}
