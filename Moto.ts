import * as rls from 'readline-sync';
import {Vehiculo} from "./Vehiculo";
export class Moto extends Vehiculo{
    private cilindrada:number;

    constructor(marca:string,modelo:string,patente:string,anioDeFabricacion:number, cilindrada:number){
        super(marca, modelo, patente, anioDeFabricacion);
        this.cilindrada = cilindrada;
    }

    getCilindrada():number{
        return this.cilindrada;
    };
    setCilindrada(cilindrada:number){
        this.cilindrada=cilindrada;
    };
    
    public mostrarDetalle(): void {
        console.log("Moto");
        super.mostrarDetalle();
        console.log(`Cilindrada: ${this.cilindrada}`);
    }

    modificar(): void {
        super.modificar();
        let nuevaCilindrada: number = rls.questionInt("Ingrese cantidad de puertas (o 0 para no modificar): ");
        if (nuevaCilindrada !== 0) {
            this.setCilindrada(nuevaCilindrada);
        }
    }
}