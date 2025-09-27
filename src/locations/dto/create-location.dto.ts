import { ApiProperty } from "@nestjs/swagger";
import { IsLatLong, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateLocationDto {
    @ApiProperty()
    @IsString()
    @MaxLength(35)
    locationName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(160)
    locationAddress: string;

    @ApiProperty()
    @IsLatLong()
    locationCoords: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    regionId?: number;

    @ApiProperty()
    @IsUUID()
    @IsOptional()
    managerId?:string;
}
