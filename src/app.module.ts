import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DaoModule } from './dao/dao.module';
import { ProxyController } from './proxy/proxy.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const prodModules =
  process.env['NODE_ENV'] !== 'development'
    ? [
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'client', 'dist'),
        }),
      ]
    : [];

const devController =
  process.env['NODE_ENV'] === 'development' ? [ProxyController] : [];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    BookmarkModule,
    DaoModule,
    ...prodModules,
  ],
  controllers: [...devController],
  providers: [AppService],
})
export class AppModule {}
