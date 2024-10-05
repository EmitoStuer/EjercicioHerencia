import * as rls from 'readline-sync';
import {Vehiculo} from "./Vehiculo";
export class Camion extends Vehiculo{
    private capacidadDeCarga :number;

    constructor(marca:string,modelo:string,patente:string,anioDeFabricacion:number, capacidadDeCarga:number){
        super(marca, modelo, patente, anioDeFabricacion);
        this.capacidadDeCarga = capacidadDeCarga;
    }

    getCapacidadDeCarga():number{
        return this.capacidadDeCarga;
    };
    setCapacidadDeCarga(capacidadDeCarga:number){
        this.capacidadDeCarga=capacidadDeCarga;
    };

    public mostrarDetalle(): void {
        console.log("Camion");
        super.mostrarDetalle();
        console.log(`Capacidad de Carga: ${this.capacidadDeCarga}`);
    }

    modificar(): void {
        super.modificar();
        let nuevaCapacidadDeCarga: number = rls.questionInt("Ingrese cantidad de puertas (o 0 para no modificar): ");
        if (nuevaCapacidadDeCarga !== 0) {
            this.setCapacidadDeCarga(nuevaCapacidadDeCarga);
        }
    }
}