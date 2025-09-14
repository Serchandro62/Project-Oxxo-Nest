import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cada vez que se entre a una ruta, ValidationPipe aplicará los validadores definidos en el DTO usado en ese endpoint
  //class-validator solo valida DTOs que vienen en el body, query o headers, no valida parámetros de ruta automáticamente.
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})); 
  /**
   * 🔹 ¿Qué hace whitelist: true?
    --Mantiene solo las propiedades del objeto que tengan algún decorador de validación en el DTO.
    --El resto (aunque estén definidas en la clase, pero sin decoradores) se eliminan.
   * 🔹 ¿Qué hace forbidNonWhitelisted: true?
    --En lugar de eliminarlas, lanza un error 400 si llegan propiedades que no tienen decorador.
    --O sea, cualquier campo sin decorador cuenta como “no permitido” y dispara excepción.
   */

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
