import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import * as jose from 'jose';
import { ROLES_KEY } from '../decorator/roles.decorator';

interface KeycloakToken extends jose.JWTPayload {
  realm_access: { roles: string[] };
  resource_access: { [key: string]: { roles: string[] } };
}

/**
 * AuthGuard implements token verification and can work
 * with @Roles decorator to verify present roles in the token.
 *
 * Injects sub to the request to use in the later stages,
 * for e.g. param decorators.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private certsUrl: string | null = null;
  private issuer: string;
  private audience: string;

  constructor(
    private config: ConfigService,
    private reflector: Reflector,
  ) {
    this.issuer = this.config.getOrThrow('AUTH_ISSUER');
    this.audience = this.config.getOrThrow('AUTH_AUDIENCE');
    this.init();
  }

  async init() {
    const configEndpoint = this.issuer + '/.well-known/openid-configuration';

    try {
      const configuration = await fetch(configEndpoint);
      const confifBody = await configuration.json();
      this.certsUrl = confifBody.jwks_uri;
    } catch (error) {
      console.log(error);
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!this.certsUrl) {
      throw new Error('No certs url set!');
    }

    const request = context.switchToHttp().getRequest<Request>();
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const token = request.headers.authorization;

    if (!token) {
      return false;
    }

    try {
      const payload = await this.verifyToken(token);
      request.sub = payload.sub;

      if (!requiredRoles) {
        return true;
      }

      const resorceRoles = payload.resource_access[this.audience].roles;

      const hasAllRoles = requiredRoles.every((i) => resorceRoles.includes(i));

      if (!hasAllRoles) {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  /**
   * Verifies the token for its signature, audience, issuer and expiry.
   * Returns decoded payload of the token.
   * @throws if token is bad.
   */
  async verifyToken(rawToken: string) {
    if (!this.certsUrl) {
      throw new Error('No certification url set');
    }
    const plainToken = rawToken.slice(7);

    const JWKS = jose.createRemoteJWKSet(new URL(this.certsUrl), {
      cooldownDuration: 1200000,
    });
    const { payload } = await jose.jwtVerify<KeycloakToken>(plainToken, JWKS, {
      issuer: this.issuer,
      audience: this.audience,
    });

    return payload;
  }
}
