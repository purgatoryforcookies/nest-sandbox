import { ForbiddenException, Injectable } from '@nestjs/common';
import { DaoService } from 'src/dao/dao.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const UNIQUE_VIOLATION_ERROR = 'P2002';

@Injectable()
export class AuthService {
  constructor(
    private dao: DaoService,
    private jtw: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const hashedPassword = await argon.hash(dto.password);

    try {
      const user = await this.dao.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === UNIQUE_VIOLATION_ERROR) {
          throw new ForbiddenException('Email is already registered');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.dao.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid login');
    }

    const pwMatch = await argon.verify(user.hash, dto.password);

    if (!pwMatch) {
      throw new ForbiddenException('Invalid login');
    }

    return this.signToken(user.id, user.email);
  }

  signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email: email,
    };

    const expiry = String(this.config.getOrThrow('JWT_EXPIRY_MIN')) + 'm';
    const secret = this.config.getOrThrow('JWT_SECRET');

    return this.jtw.signAsync(payload, {
      expiresIn: expiry,
      secret: secret,
    });
  }
}
