import { IsInt, IsNumber, isNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsUUID("4") //Queremos que sea un UUID tipo 4
    @IsOptional() //En caso de que no lo traiga, igual lo estamos poniendo en la función
    @IsString()
    
    productId: string;

    @IsString()
    @MaxLength(40) //40 caracteres
    productName: string;

    @IsNumber()
    price: number;

    @IsInt()
    countSeal: number;

    @IsUUID()
    provider: string;
}
