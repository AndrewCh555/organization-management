import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { User } from '../schemas/user.schema';

interface UserDec extends User {
  dataValues: any;
}

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest<Request>().user as UserDec;
    console.log('wwwww', user);
    delete user.password;

    return user;
  },
);
