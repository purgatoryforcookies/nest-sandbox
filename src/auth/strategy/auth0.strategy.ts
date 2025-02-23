import { Auth0Client } from '@auth0/auth0-spa-js';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DaoService } from 'src/dao/dao.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(
    config: ConfigService,
    private dao: DaoService,
    private auth0Client: Auth0Client,
  ) {
    const auth0Secret = config.getOrThrow('AUTH_0_SECRET');
    const auth0Audience = config.getOrThrow('AUTH_0_AUDIENCE');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: auth0Secret,
      audience: auth0Audience,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    const user = await this.dao.user.findFirst({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const { hash, ...strippedUser } = user;

    return strippedUser;
  }
}
