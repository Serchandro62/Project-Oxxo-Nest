import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        default: "user@gmail.com"
    })
    @IsEmail()
    userEmail: string;

    @ApiProperty({
        default: "22384hdw23"
    })
    @IsString()
    @MinLength(8)
    userPassword: string;

    @ApiProperty({
        default: "Employee"
    })
    @IsIn(['Admin','Employee','Manager'],{each:true}) //El array userRoles solo puede contener valores que estén en esta lista: 'Admin', 'Employee' o 'Manager'"
    @IsOptional()
    userRoles: string[];
}



