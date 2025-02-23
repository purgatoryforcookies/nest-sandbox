import { createProxyMiddleware } from 'http-proxy-middleware';
import { All, Controller, Get, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const proxy = createProxyMiddleware({
  target: 'http://127.0.0.1:5173',
  ws: true,
  secure: false,
  changeOrigin: true,
});

@Controller()
export class ProxyController {
  @All('*')
  get(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    if (req.path.startsWith('/api') || req.path.startsWith('/auth')) {
      next();
      return;
    }
    proxy(req, res, next);
  }
}
