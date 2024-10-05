import * as rls from 'readline-sync';
import {Vehiculo} from "./Vehiculo";
export class Auto extends Vehiculo{
    private cantidadDePuertas:number;

    constructor(marca:string,modelo:string,patente:string,anioDeFabricacion:number,cantidadDePuertas:number){
        super(marca, modelo, patente, anioDeFabricacion);
        this.cantidadDePuertas = cantidadDePuertas;
    }

    getCantidadDePuertas():number{
        return this.cantidadDePuertas;
    };
    setCantidadDePuertas(cantidadDePuertas:number){
        this.cantidadDePuertas=cantidadDePuertas;
    };

    public mostrarDetalle(): void {
        console.log("Auto")
        super.mostrarDetalle();
        console.log(`Cantidad de Puertas: ${this.cantidadDePuertas}`);
    }

    modificar(): void {
        super.modificar();
        let nuevoCantPuertas: number = rls.questionInt("Ingrese cantidad de puertas (o 0 para no modificar): ");
        if (nuevoCantPuertas !== 0) {
            this.setCantidadDePuertas(nuevoCantPuertas);
        }
    }

}