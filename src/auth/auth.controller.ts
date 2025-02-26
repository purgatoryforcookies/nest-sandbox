import {
  Controller,
  Get,
  Next,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoginGuard } from './guard/login.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private config: ConfigService) {}

  @Get('login')
  @UseGuards(LoginGuard)
  async login() {}

  @Get('callback')
  @UseGuards(LoginGuard)
  loginCallback(@Res() res: Response) {
    res.redirect('/');
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: false }) res: Response,
    @Req() req: Request,
    @Next() next: NextFunction,
  ) {
    req.logOut((err) => {
      if (err) return next(err);
      const logOutUrl = this.config.get('KEYCLOAK_LOGOUT');
      const clientId = this.config.get('KEYCLOAK_CLIENT_ID');
      const originatedFrom = req.headers.origin;
      if (!logOutUrl || !originatedFrom || !clientId) {
        console.log(
          'Warning! No logout url / origin url / client_id, defaulting to home.',
        );
        res.redirect('/');
        return;
      }
      const redirecturi = encodeURIComponent(originatedFrom);
      res.redirect(
        logOutUrl +
          `?client_id=${clientId}&post_logout_redirect_uri=${redirecturi}`,
      );
    });
  }
}
