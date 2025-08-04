import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Middleware para leer cookies (necesario para usar JWT en cookies)
  app.use(cookieParser());

  // ✅ Habilita validaciones globales con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               // Elimina propiedades no definidas en los DTOs
      forbidNonWhitelisted: true,    // Lanza error si se envían propiedades no permitidas
      transform: true,               // Convierte automáticamente tipos (por ejemplo, string a number)
    }),
  );

  // ✅ Configuración de CORS (importante para que el frontend acceda con cookies)
  app.enableCors({
    origin: 'http://localhost:5173', // Cambiar a dominio de producción si aplica
    credentials: true,               // 🔥 NECESARIO para que se envíen cookies en las peticiones
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();
