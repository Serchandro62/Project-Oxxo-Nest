import { Location } from "src/locations/entities/location.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    employeeId: string;

    @Column({type: "text"})
    employeeName: string;

    @Column({type: "text"})
    employeeLastName: string;

    @Column({type: "text"})
    employeePhoneNumber: string;

    @Column({type:"text"})
    employeePhoto: string
    
    @Column({type: 'text', unique: true})
    employeeEmail: string;

    @ManyToOne(()=>Location, (location)=>location.employees)
    @JoinColumn({name: 'locationId'})
    location: Location; 

    @OneToOne(()=>User,(user)=>user.employee)
    @JoinColumn({name: 'userId'})
    user: User;
}
