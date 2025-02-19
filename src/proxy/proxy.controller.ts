import { createProxyMiddleware } from 'http-proxy-middleware';
import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const proxy = createProxyMiddleware({
  target: 'http://127.0.0.1:5173',
  ws: true,
});

@Controller('*')
export class ProxyController {
  @All()
  get(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    proxy(req, res, next);
  }
}
