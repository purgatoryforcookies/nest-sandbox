import { createParamDecorator, ForbiddenException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (field: keyof User | undefined, ctx: ExecutionContextHost) => {
    const request = ctx.switchToHttp().getRequest<Express.Request>();

    if (!request.user) {
      throw new ForbiddenException('User not found');
    }

    if (field) {
      return request.user[field];
    }
    return request.user;
  },
);
