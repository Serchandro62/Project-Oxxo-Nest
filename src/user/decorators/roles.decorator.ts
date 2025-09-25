import { Reflector } from '@nestjs/core';

//@Roles será un decorador que indicará que clase de role tiene que tener el que hace la petición. 

/**
 * Los metadatos son información sobre clases, métodos o propiedades. Ingresados por decoradores, para que frameworks 
*   como NestJS sepan cómo comportarse con tu código. (No todos los decoradores meten metadatos)
 * @Controller() → "Esta clase maneja rutas HTTP"
 * @Injectable() → "Esta clase se puede inyectar como dependencia"
 * @Get() → "Este método responde a peticiones GET"
 * @SetMetadata('roles', ['admin']) → Solo añade un string,string[]. El significado se lo da quien accede a la metadata. 
 * @UserData(), @Body(), @Query(), @Param() @IsEmail() → Esto no mete nada. Algunos solo hacen lo suyo y no cambian propiedades de eso a lo que decoran. 
 * Unos decoradores GUARDAN metadata para que otros la lean después, otros decoradores inyectan, validano transforman en tiempo de ejecución
 * ////////////////////Reflector es la clase que lee estos metadatos para decidir qué hacer.
 * Sin metadatos, NestJS no sabría qué clases son controllers, qué métodos son endpoints, o qué permisos requieren.
 */
export const Roles = Reflector.createDecorator<string[]>();

//createDecorator: Crea decoradores que GUARDAN metadatos
//@Roles() será un decorador que acepte un arreglo de strings que añadirá su contenido como metadata a lo que decora. 
