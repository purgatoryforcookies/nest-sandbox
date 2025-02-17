import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DaoService } from 'src/dao/dao.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private dao: DaoService) {}

  async editUser(userId: number, dto: EditUserDto) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Received empty body');
    }

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
  }
}
