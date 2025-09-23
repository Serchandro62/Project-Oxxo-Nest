import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateManagerDto {
    @IsString()
    @MaxLength(80)
    managerFullName: string;
    @IsNumber()
    managerSalary: number;
    @IsString()
    @IsEmail()
    managerEmail: string;
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string
}
