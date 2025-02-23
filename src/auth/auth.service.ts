import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DaoService } from 'src/dao/dao.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BookmarkService } from 'src/bookmark/bookmark.service';

const UNIQUE_VIOLATION_ERROR = 'P2002';

@Injectable()
export class AuthService {
  constructor(
    private dao: DaoService,
    private jtw: JwtService,
    private config: ConfigService,
    private bookmarkService: BookmarkService,
  ) {}

  async signup(dto: AuthDto) {
    const hashedPassword = await argon.hash(dto.password);

    try {
      const user = await this.dao.user.create({
        data: {
          username: dto.username,
          hash: hashedPassword,
        },
      });
      await this.bookmarkService.boilerplate(user.id);

      return this.signToken(user.id, user.username);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === UNIQUE_VIOLATION_ERROR) {
          throw new BadRequestException('Username is already registered');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.dao.user.findFirst({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid login');
    }

    const pwMatch = await argon.verify(user.hash, dto.password);

    if (!pwMatch) {
      throw new ForbiddenException('Invalid login');
    }

    return this.signToken(user.id, user.username);
  }

  signToken(userId: number, username: string) {
    const payload = {
      sub: userId,
      username: username,
    };

    const expiry = String(this.config.getOrThrow('JWT_EXPIRY_MIN')) + 'm';
    const secret = this.config.getOrThrow('JWT_SECRET');

    return this.jtw.signAsync(payload, {
      expiresIn: expiry,
      secret: secret,
    });
  }
}
