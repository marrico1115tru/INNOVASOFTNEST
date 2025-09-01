import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Lista blanca de orígenes permitidos
  const whitelist = [
    'http://localhost:8080',       // frontend local
    'http://127.0.0.1:8080',       // localhost con IP loopback
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir llamadas sin origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      // Permitir si está en la whitelist
      if (whitelist.includes(origin)) {
        return callback(null, true);
      }

      // Permitir dinámicamente cualquier IP de red local o pública
      const regex = /^http:\/\/\d{1,3}(\.\d{1,3}){3}(:\d+)?$/;
      if (regex.test(origin)) {
        return callback(null, true);
      }

      // Si no cumple, rechazar
      return callback(new Error(`CORS bloqueado para el origen: ${origin}`), false);
    },
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();
