import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DaoService } from 'src/dao/dao.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private dao: DaoService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
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
