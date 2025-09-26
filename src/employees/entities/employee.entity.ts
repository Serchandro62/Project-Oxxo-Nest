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
    lastName: string;
    @Column({type: "text"})
    phoneNumber: string;
    @Column({type:"text"})
    photoUrl: string

    @ManyToOne(()=>Location, (location)=>location.employees)
    @JoinColumn({name: 'locationId'})
    location: Location; 

    @OneToOne(()=>User,(user)=>user.employee)
    @JoinColumn({name: 'userId'})
    user: User
}
