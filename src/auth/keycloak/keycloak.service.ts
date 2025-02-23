import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  constructor(private config: ConfigService) {}

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.config.getOrThrow('KEYCLOAK_AUTH_SERVER_URL'),
      realm: this.config.getOrThrow('KEYCLOAK_REALM'),
      clientId: this.config.getOrThrow('KEYCLOAK_CLIENT_ID'),
      secret: this.config.getOrThrow('KEYCLOAK_CLIENT_SECRET'),
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
