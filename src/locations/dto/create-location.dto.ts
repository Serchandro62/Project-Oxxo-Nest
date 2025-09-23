import { IsLatLong, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateLocationDto {
    @IsString()
    @MaxLength(35)
    locationName: string;

    @IsString()
    @MaxLength(160)
    locationAddress: string;

    @IsLatLong()
    locationCoords: string;
}
