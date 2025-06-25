import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🟡 Middleware para habilitar lectura de cookies (requerido para JWT en cookies)
  app.use(cookieParser());

  // 🟢 Validaciones globales con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas en DTO
      forbidNonWhitelisted: true, // lanza error si se envían propiedades no permitidas
      transform: true, // convierte tipos automáticamente (por ejemplo string a number)
    }),
  );

  // 🔵 Configura CORS para permitir cookies desde el frontend (React, etc.)
  app.enableCors({
    origin: 'http://localhost:3001', // dirección del frontend
    credentials: true, // 🔥 necesario para enviar cookies (como el token)
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();
