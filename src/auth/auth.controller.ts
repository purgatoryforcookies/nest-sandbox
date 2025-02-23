import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Response } from 'express';
import { BookmarkService } from 'src/bookmark/bookmark.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signup(dto);
    res.cookie('token', `${token}`, { httpOnly: true, sameSite: 'strict' });
    res.redirect('/');
    return;
  }

  @Post('login')
  async signin(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signin(dto);
    res.cookie('token', `${token}`, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.redirect('/');
    return;
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    res.redirect('/login');
    return;
  }
}
