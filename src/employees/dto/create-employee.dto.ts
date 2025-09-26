import { IsEmail, IsInt, IsOptional, IsString, isString, IsUUID, MaxLength } from "class-validator";

//Es la plantilla de lo que debe llevar nuestras peticiones para crear un employee
export class CreateEmployeeDto {
    @IsUUID("4")
    @IsOptional()
    employeeId?: string;

    @IsString()
    @MaxLength(40)
    employeeName: string;

    @IsString()
    @MaxLength(40)
    employeeLastName: string;

    @MaxLength(10)
    @IsString()
    employeePhoneNumber: string;

    @IsEmail()
    @MaxLength(30)
    employeeEmail: string;

    
}
