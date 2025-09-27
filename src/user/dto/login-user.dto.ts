import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto {
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
}




