import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const clientLoggedIn = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>{
        const req = context.switchToHttp().getRequest();
        return req.user
    }
)