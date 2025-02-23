import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DaoService } from 'src/dao/dao.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private dao: DaoService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.getOrThrow('JWT_SECRET'),
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'token' in req.cookies) {
      return req.cookies.token;
    }
    return null;
  }

  async validate(payload: any) {
    const user = await this.dao.user.findFirst({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      return null;
    }

    const { hash, ...strippedUser } = user;

    return strippedUser;
  }
}
