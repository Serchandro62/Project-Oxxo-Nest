import { IsEmail, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Provider } from "../entities/provider.entity";

export class CreateProviderDto {
    @IsUUID("4")
    @IsOptional()
    providerId?: string; 

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
