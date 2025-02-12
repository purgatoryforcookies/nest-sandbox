import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DaoModule } from './dao/dao.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DaoModule,
  ],
})
export class AppModule {}
