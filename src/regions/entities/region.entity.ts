import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId: number;
    @Column({type:'text', unique:true})
    regionName: string;
    @Column('simple-array') //Este permite que un arreglo, sea convertido a una cadena de texto de tipo "elemento a","elemento b"... en la DB 
    regionStates: string[];

    @OneToMany(()=>Location, (location)=>location.region)
    locations: Location[];
}
