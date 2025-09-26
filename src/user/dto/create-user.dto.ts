import { IsArray, IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    userEmail: string;
    @IsString()
    @MinLength(8)
    userPassword: string;

    @IsIn(['Admin','Employee','Manager']) //El array userRoles solo puede contener valores que estén en esta lista: 'Admin', 'Employee' o 'Manager'"
    @IsOptional()
    userRoles: string[];
}



