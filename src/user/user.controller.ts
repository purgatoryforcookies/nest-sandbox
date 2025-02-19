import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { Response } from 'express';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch()
  async editUser(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Body() dto: EditUserDto,
  ) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Received empty body');
    }

    if (dto.email === user.email) {
      delete dto.email;
    }
    const editedUser = await this.userService.editUser(user.id, dto);

    return editedUser;
  }

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
