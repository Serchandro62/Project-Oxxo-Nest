import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';

//Es una versión de CreateEmployeeDto, pero donde todas las propiedades son opcionales.
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

/**
 * PartialType toma tu clase CreateEmployeeDto y, de forma automática, crea una nueva clase 
 * con exactamente las mismas propiedades, pero marcando cada una de ellas como opcional.
 */
///////////////////////////////////////////
/**
 * Sin PartialType: Tendrías que crear y mantener a mano un archivo update-employee.dto.ts que 
 * sea una copia exacta del create-employee.dto.ts, pero añadiendo un ? a cada propiedad. 
 * Si en el futuro añades un campo email a CreateEmployeeDto, tendrías que acordarte de añadirlo 
 * también como opcional en UpdateEmployeeDto.
 */