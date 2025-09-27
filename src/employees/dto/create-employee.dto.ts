import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNumber, IsObject, IsOptional, IsString, isString, IsUUID, MaxLength } from "class-validator";
import { User } from "src/user/entities/user.entity";

//Es la plantilla de lo que debe llevar nuestras peticiones para crear un employee
export class CreateEmployeeDto {
    @ApiProperty()
    @IsString()
    @MaxLength(40)
    employeeName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(40)
    employeeLastName: string;

    @ApiProperty()
    @MaxLength(10)
    @IsString()
    employeePhoneNumber: string;

    @ApiProperty()
    @IsOptional()
    employeePhoto?: string;

    @ApiProperty()
    @IsEmail()
    @MaxLength(30)
    employeeEmail: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    locationId?: number;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    userId?: string;

    
}
