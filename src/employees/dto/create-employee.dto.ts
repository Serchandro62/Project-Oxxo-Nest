import { IsEmail, IsInt, IsNumber, IsObject, IsOptional, IsString, isString, IsUUID, MaxLength } from "class-validator";
import { User } from "src/user/entities/user.entity";

//Es la plantilla de lo que debe llevar nuestras peticiones para crear un employee
export class CreateEmployeeDto {
    @IsString()
    @MaxLength(40)
    employeeName: string;

    @IsString()
    @MaxLength(40)
    employeeLastName: string;

    @MaxLength(10)
    @IsString()
    employeePhoneNumber: string;

    @IsOptional()
    employeePhoto?: string;

    @IsEmail()
    @MaxLength(30)
    employeeEmail: string;

    @IsOptional()
    @IsNumber()
    locationId?: number;

    @IsOptional()
    @IsUUID()
    userId?: string;

    
}
