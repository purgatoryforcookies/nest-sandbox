import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';

/**
 * GetUser returns req.sub field from request.
 *
 * sub field is injected from access token to the request
 * in AuthGuard, and therefore this parameter decorator
 * cannot be used without it.
 */
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { sub } = request;

    if (!sub) {
      throw new InternalServerErrorException('Missing sub field!');
    }
    return sub;
  },
);
