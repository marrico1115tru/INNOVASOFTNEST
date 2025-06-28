import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔐 LOGIN
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const tokenData = await this.authService.login(user);

    // 🍪 Guardar token en cookie httpOnly
    res.cookie('token', tokenData.access_token, {
      httpOnly: true,           // 🔐 Evita acceso desde JS
      sameSite: 'lax',          // 🛡️ Protección básica CSRF
      secure: false,            // 🔐 Poner en true con HTTPS en producción
      maxAge: 1000 * 60 * 60 * 24, // ⏱️ 1 día
    });

    // ✅ Devolver info útil (sin el token)
    return {
      message: '✅ Login exitoso',
      user: tokenData.user,
    };
  }

  // 🚪 LOGOUT
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token'); // 🧹 Borra el token
    return { message: '🚪 Sesión cerrada correctamente' };
  }

  // 🧠 GET /auth/me (usuario autenticado)
  @UseGuards(JwtGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return req.user; // 🎯 JwtGuard ya colocó aquí el usuario decodificado del token
  }
}
