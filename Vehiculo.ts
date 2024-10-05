import * as rls from 'readline-sync';
export class Vehiculo{
    private marca:string;
    private modelo:string;
    private patente:string;
    private anioDeFabricacion:number;

    constructor(marca:string,modelo:string,patente:string,anioDeFabricacion:number){
        this.marca = marca;
        this.modelo = modelo;
        this.patente = patente;
        this.anioDeFabricacion = anioDeFabricacion;
    }

    getMarca():string{
        return this.marca;
    };
    setMarca(marca:string){
        this.marca = marca;
    };
    getModelo():string{
        return this.modelo;
    };
    setModelo(modelo:string){
        this.modelo=modelo;
    };
    getPatente():string{
        return this.patente;
    };
    setPatente(patente:string){
        this.patente = patente;
    };
    getAnioDeFabricacion():number{
        return this.anioDeFabricacion;
    };
    setAnioDeFabricacion(anioDeFabricacion:number){
        this.anioDeFabricacion=anioDeFabricacion;
    };

    public mostrarDetalle(): void {
        console.log(`Marca: ${this.marca}. \n Modelo: ${this.modelo}. \n Patente: ${this.patente}. \n Año: ${this.anioDeFabricacion}.`);
    }

    modificar(): void {
        let nuevaMarca: string = rls.question("Ingrese nueva marca (o presione Enter para no modificar): ");
        let nuevoModelo: string = rls.question("Ingrese nuevo modelo (o presione Enter para no modificar): ");
        let nuevoAnio: number = rls.questionInt("Ingrese nuevo año (o 0 para no modificar): ");

        if (nuevaMarca) {
            this.setMarca(nuevaMarca);
        }
        if (nuevoModelo) {
            this.setModelo(nuevoModelo);
        }
        if (nuevoAnio !== 0) {
            this.setAnioDeFabricacion(nuevoAnio);
        }
    }

}