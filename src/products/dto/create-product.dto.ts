import { IsInt, IsNumber, isNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateProductDto {
    /**
     * Los decoradores de class-validator solo funcionan una vez que se ejecuta el programa (runtime)
     * La verificación de campos (por ejemeplo el "?") de typescript solo funciona en compialcion (no runtime)
     */

    @IsUUID("4") //Queremos que sea un UUID tipo 4
    @IsOptional()
    productId?: string; 

    @IsString()
    @MaxLength(40) //40 caracteres
    productName: string;

    @IsNumber()
    price: number;

    @IsInt()
    countSeal: number;

    @IsUUID()
    @IsOptional() //le dice a class-validator que ignore las validaciones si el campo no está presente o es undefined
    provider?: string; //Esto le dice a TS que el tipo realmente es "string | undefined"
}
