import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-openidconnect';

@Injectable()
export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor(config: ConfigService) {
    super({
      clientID: config.getOrThrow('KEYCLOAK_CLIENT_ID'),
      clientSecret: config.getOrThrow('KEYCLOAK_CLIENT_SECRET'),
      issuer: config.getOrThrow('KEYCLOAK_ISSUER'),
      authorizationURL: config.getOrThrow('KEYCLOAK_AUTH'),
      tokenURL: config.getOrThrow('KEYCLOAK_TOKEN'),
      userInfoURL: config.getOrThrow('KEYCLOAK_USERINFO'),
      callbackURL: config.getOrThrow('KEYCLOAK_CALLBACK_URL'),
    });
  }
  async validate(
    _issuer: string,
    profile: Profile,
    cb: (err: Error | null, profile: Profile) => void,
  ) {
    cb(null, profile);
  }
}
