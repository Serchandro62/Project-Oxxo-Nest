import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;

    @Column({type: 'text'})
    providerName: string;

    @Column({type: "text"})
    providerEmail: string;
    
    @Column({type: "text", nullable: true})
    providerPhoneNumber: string;
}
