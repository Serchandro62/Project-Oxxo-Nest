import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserData = createParamDecorator( //Esto devuelve un decorador "UserData" que NO añade metadata
    (data: unknown, ctx: ExecutionContext)=>{
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);