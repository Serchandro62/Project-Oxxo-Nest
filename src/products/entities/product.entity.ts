import { Provider } from "src/providers/entities/provider.entity";
import { Entity, Column, PrimaryGeneratedColumn, IsNull, ManyToOne, JoinColumn } from "typeorm";
@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    productId: string;

    @Column({type: "text", unique: true})
    productName: string;

    @Column({type: "float"})
    price: number;

    @Column({type: "int"})
    countSeal: number;

    /**
     * La primera función devuelve la entidad con la que tendremos la relación.
     * La segunda función devuelve qué atributo de esa entidad es la que apunta de vuelta para acá. 
     */
    @ManyToOne(()=>Provider, (provider)=>provider.products, { eager: true })
    @JoinColumn({name: "providerId"})
    /**
     * TypeORM automáticamente representará la relación con el proveedor
     * con una tabla foreign-key. Con @JoinColumn solamente estamos configurando
     * el nombre de esa columna
     */
    provider: Provider
}
