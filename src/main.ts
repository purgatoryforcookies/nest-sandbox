import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const isdev = process.env['NODE_ENV'] === 'development';
  if (isdev) {
    console.log('Development mode', isdev);
  }

  const corsOrigins = [
    'https://sandbox.purgatoryforcookies.com',
    'https://key.purgatoryforcookies.com',
  ];

  if (isdev) {
    corsOrigins.push('http://localhost:3000');
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
