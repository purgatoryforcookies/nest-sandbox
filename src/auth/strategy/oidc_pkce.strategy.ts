import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as oid from 'openid-client';
import { Profile } from 'passport';
import { _OidcStrategyPKCE } from './custom/pkce';

export const buildOpenIdClient = async (
  issuer: string,
  clientId: string,
  secret: string,
) => {
  const TrustIssuer = await oid.discovery(
    new URL(`${issuer}/.well-known/openid-configuration`),
    clientId,
    secret,
  );
  return TrustIssuer;
};

@Injectable()
export class OidcStrategyPKCE extends PassportStrategy(
  _OidcStrategyPKCE,
  'oidc-pkce',
) {
  oidcConfig: oid.Configuration;

  constructor(config: ConfigService, oidcConfig: oid.Configuration) {
    super(oidcConfig, config.getOrThrow('KEYCLOAK_CALLBACK_URL'));
    this.oidcConfig = oidcConfig;
  }

  async validate(
    _issuer: string,
    profile: Profile,
    cb: (err: Error | null, profile: Profile) => void,
  ) {
    cb(null, profile);
  }
}
