import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
