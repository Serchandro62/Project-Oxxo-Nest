import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default: "Oxxo Juriquilla"
    })
    @Column('text')
    locationName: string;

    @ApiProperty({
        default: "Av tal s/n 2304"
    })
    @Column('text')
    locationAddress: string;

    @ApiProperty({
        default: [12,12]
    })
    @Column('text',{unique: true})
    locationCoords: string;
    /**
     * TypeORM no puede saber por sí solo en cuál de las dos tablas crearla. Por esta razón, requiere 
     * que tú especifiques explícitamente dónde quieres la columna FK usando el decorador @JoinColumn(). 
     * Si no lo usas, TypeORM no sabe qué columna crear y dónde.
     */
    @OneToOne(()=>Manager, (manager)=>manager.location,{eager:true})
    @JoinColumn({name: 'managerId'})
    manager: Manager;

    @ManyToOne(()=>Region, (region)=>region.locations)
    @JoinColumn({name: 'regionId'})
    region: Region;

    @OneToMany(()=>Employee, (employee)=>employee.location)
    employees: Employee[];
}
