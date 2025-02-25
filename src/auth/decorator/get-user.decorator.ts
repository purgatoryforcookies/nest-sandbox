import { createParamDecorator, ForbiddenException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const GetUser = createParamDecorator(
  (
    field: keyof Express.User['user'] | undefined,
    ctx: ExecutionContextHost,
  ) => {
    const request = ctx.switchToHttp().getRequest<Express.Request>();

    if (!request.user) {
      throw new ForbiddenException('User not found');
    }

    if (field) {
      return request.user.user[field];
    }
    return request.user.user;
  },
);
