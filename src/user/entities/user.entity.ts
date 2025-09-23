import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    @Column({type: 'text', nullable: false})
    userEmail:string;
    @Column({type: 'text', nullable: false})
    userPassword:string;
}
