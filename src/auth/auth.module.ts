import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { BookmarkService } from 'src/bookmark/bookmark.service';
import { buildOpenIdClient, OidcStrategy, OidcStrategyPKCE } from './strategy';
import { SessionSerializer } from './session.serializer';
import { ConfigService } from '@nestjs/config';

const OidcStrategyFactory = {
  provide: 'oidc-pkce',
  useFactory: async (config: ConfigService) => {
    const issuer = config.getOrThrow('KEYCLOAK_ISSUER');
    const clientId = config.getOrThrow('KEYCLOAK_CLIENT_ID');
    const secret = config.getOrThrow('KEYCLOAK_CLIENT_SECRET');

    const client = await buildOpenIdClient(issuer, clientId, secret);
    const strategy = new OidcStrategyPKCE(config, client);
    return strategy;
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    PassportModule.register({
      session: true,
      defaultStrategy: 'oidc-pcke',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    OidcStrategyFactory,
    SessionSerializer,
    BookmarkService,
  ],
})
export class AuthModule {}
