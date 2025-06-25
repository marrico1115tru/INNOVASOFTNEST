import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Middleware para leer cookies (obligatorio para JWT en cookies)
  app.use(cookieParser());

  // ✅ Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas en DTO
      forbidNonWhitelisted: true, // lanza error si se envían propiedades no permitidas
      transform: true, // convierte tipos automáticamente
    }),
  );

  // ✅ Habilita CORS con credenciales (para enviar cookies desde React)
  app.enableCors({
    origin: 'http://localhost:3001', // tu frontend
    credentials: true, // 🔥 importante para que se envíen cookies
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();
