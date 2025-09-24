import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    @Column({ type: 'text', unique: true, nullable: false })
    userEmail: string;
    @Column({ type: 'text', nullable: false })
    userPassword: string;
    @Column({ 
        type: 'simple-array',
        default: 'Employee' //el valor por defecto en caso de que no se ingrese nada 
    })
    userRoles: string[];
}
