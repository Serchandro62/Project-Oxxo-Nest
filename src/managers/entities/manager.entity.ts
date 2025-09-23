import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;
    @Column('text')
    managerFullName: string;
    @Column('float')
    managerSalary: number;
    @Column('text')
    managerEmail: string;
    @Column('text')
    managerPhoneNumber: string;
    /**
     * TypeORM no puede saber por sí solo en cuál de las dos tablas crearla. Por esta razón, requiere 
     * que tú especifiques explícitamente dónde quieres la columna FK usando el decorador @JoinColumn(). 
     * Si no lo usas, TypeORM no sabe qué columna crear y dónde.
     */
    @OneToOne(()=>Location, (location)=>location.manager) 
    location: Location
}
