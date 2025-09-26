import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";

/**
 * Creamos un decorador @Auth('algo') que:
 * 1.- Verificará que el JWT esté válido y lo expondrá en request.user
 * 2.- Contendrá un 'algo' que indica qué rol se pide para acceder a algún lado. 
 * 3.- Verificará si el usuario tiene al menos un rol que se pide.
*/
export const Auth = (roles: string[]) => {
    roles.push('Admin') //Auth siempre estará en @Roles() para que si un usuario tiene al menos Admin, siempre puede entrar a todos
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard,RolesGuard)
    )
}