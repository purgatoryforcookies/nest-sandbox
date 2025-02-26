import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const sessionSecret = process.env['SESSION_SECRET'];

  if (!sessionSecret) {
    throw new Error('No secret set for session');
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /**
   * In production, we are sitting behind a reverse
   * proxy. Trust it, so that the req parameters
   * are correctly seen in src\auth\strategy\custom\pkce.ts
   */
  app.set('trust proxy', 1);

  app.enableCors({
    origin: '*',
    methods: ['*'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(cookieParser());
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      store: new session.MemoryStore(),
      rolling: true,
      cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
