import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { Provider } from "../entities/provider.entity";

export class CreateProviderDto {
    /*
    * providerId: string;  Este no lo vamos a validar ni incluir en el molde porque no estaremos
    * esperando un id en la petición POST
    */

    @IsString()
    @MaxLength(100)
    providerName: string;

    @IsEmail()
    @IsString()
    providerEmail: string;

    @IsString()
    @MaxLength(15)
    @IsOptional()
    providerPhoneNumber?: string;
}
