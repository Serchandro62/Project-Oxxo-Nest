import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * El propósito de esta función es crear un decorador que consiga un valor. 
 * En este caso, ese valor será el request.user que se modificó con el AuthGuard
 */

export const UserData = createParamDecorator( //Esto devuelve un decorador "UserData"
    (data: unknown, ctx: ExecutionContext)=>{
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);

/**
 * createParamDecorator: Es una función factory que crea decoradores personalizados para parámetros
 * Permite extraer datos específicos del request de forma reutilizable
 * Retorna un decorador que puede ser usado en los parámetros de los controladores
 */

/**
 * data: unknown --> Contiene los datos estáticos pasados al decorador cuando se usa. Ejemplo: 
 * findAll(@UserData('email') userEmail: string) --> 'email' sería data
 * data no se está usando en esta implementación específica. Se ignora
 */

//ExecutionContext ya tiene notas en el guard. Será inyectado acá también. 

/**
 * unknown vs any----------------------------------------------------------------
 * Característica	                            any	                unknown
 * Verificación de tipos	                    No requiere	        Requiere
 * Asignable a otros tipos	                    ✅ Sí	           ❌ No (sin verificación)
 * Seguridad en tiempo de compilación	        ❌ Baja	            ✅ Alta
 * Flexibilidad	                                ✅ Máxima	        ✅ Controlada
 */