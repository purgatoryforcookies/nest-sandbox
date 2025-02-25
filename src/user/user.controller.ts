import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  user(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    if (!req.isAuthenticated()) {
      res.sendStatus(401);
      return;
    }
    /**
     * Note: user object contains the user and the users tokens.
     * Do not send tokens to the client.
     */
    return req.user.user;
  }
}
