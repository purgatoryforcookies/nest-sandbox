import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DaoModule } from './dao/dao.module';
import { ProxyController } from './proxy/proxy.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DaoModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client', 'dist'),
    // }),
  ],
  controllers: [ProxyController],
})
export class AppModule {}
