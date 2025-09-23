import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;

    @Column({type: 'text'})
    providerName: string;

    @Column({type: "text"})
    providerEmail: string;
    
    @Column({type: "text", nullable: true})
    providerPhoneNumber: string

     /**
     * La primera función devuelve la entidad con la que tendremos la relación.
     * La segunda función devuelve qué atributo de esa entidad es la que apunta de vuelta para acá. 
     */
    @OneToMany(()=>Product, (product)=>product.provider)
    products: Product[] //Es un arreglo porque esta entidad tendrá mucha de las otras. 
}
