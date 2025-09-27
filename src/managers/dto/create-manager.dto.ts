import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateManagerDto {
    @ApiProperty()
    @IsString()
    @MaxLength(80)
    managerFullName: string;
    @ApiProperty()
    @IsNumber()
    managerSalary: number;
    @ApiProperty()
    @IsString()
    @IsEmail()
    managerEmail: string;
    @ApiProperty()
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string
}
