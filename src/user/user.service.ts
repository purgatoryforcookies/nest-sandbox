import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DaoService } from 'src/dao/dao.service';
import { EditUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const UNIQUE_CONSTRAINT_ERROR = 'P2002';

@Injectable()
export class UserService {
  constructor(private dao: DaoService) {}

  async editUser(userId: number, dto: EditUserDto) {
    try {
      const user = await this.dao.user.update({
        where: {
          id: userId,
        },
        data: {
          ...dto,
        },
      });

      if (!user) {
        throw new NotFoundException('User was not returned');
      }

      const { hash, ...strippedUser } = user;

      return strippedUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === UNIQUE_CONSTRAINT_ERROR) {
          throw new BadRequestException('Email is in use already');
        }
      }
      throw error;
    }
  }
}
