import * as rls from 'readline-sync';
import { Vehiculo } from "./Vehiculo";
import { Auto } from "./Auto";
import { Moto } from "./Moto";
import { Camion } from "./Camion";

export class RegistroAutomotor {
    private nombre: string;
    private listaVehiculos: Vehiculo[];

    constructor(nombre: string) {
        this.nombre = nombre;
        this.listaVehiculos = [];
    }

    public opcionesVehiculos(): void {
        let opcionSeleccionada: number;
        do {
            opcionSeleccionada = this.menuOpciones("Opciones \n 1 - Agregar Vehiculo \n 2 - Ver Vehiculos \n 3 - Modificar un Vehiculo \n 4 - Eliminar Vehiculo \n 5 - Salir", 1, 5);
            switch (opcionSeleccionada) {
                case 1: this.agregarVehiculo(); break;
                case 2: this.verVehiculos(); break;
                case 3: this.modificarVehiculo(); break;
                case 4: this.eliminarVehiculo(); break;
                case 5: console.log("Saliendo..."); break;
                default: console.log("Error de Datos");
            }
        } while (opcionSeleccionada !== 5);
    }

    private agregarVehiculo(): void {
        let opcionSeleccionada: number;
        do {
            opcionSeleccionada = this.menuOpciones(`¿Qué vehículo desea agregar? \n 1 - Auto. \n 2 - Moto. \n 3 - Camión. \n 4 - Salir.`, 1, 4);
            if (opcionSeleccionada < 4) {
                this.crearVehiculoPorTipo(opcionSeleccionada);
            }
        } while (opcionSeleccionada !== 4);
    }

    crearVehiculoPorTipo(tipo: number): void {
        const datosVehiculo = this.crearVehiculo();
        let vehiculo: Vehiculo | undefined;
    
        // Define el tipo del objeto creadores
        const creadores: { [key: number]: () => Vehiculo } = {
            1: () => {
                const cantidadDePuertas: number = rls.questionInt("Ingrese Cantidad De Puertas: ");
                return new Auto(datosVehiculo.marca, datosVehiculo.modelo, datosVehiculo.patente, datosVehiculo.anioDeFabricacion, cantidadDePuertas);
            },
            2: () => {
                const cilindrada: number = rls.questionInt("Ingrese Cilindrada: ");
                return new Moto(datosVehiculo.marca, datosVehiculo.modelo, datosVehiculo.patente, datosVehiculo.anioDeFabricacion, cilindrada);
            },
            3: () => {
                const capacidadDeCarga: number = rls.questionInt("Ingrese Capacidad de Carga: ");
                return new Camion(datosVehiculo.marca, datosVehiculo.modelo, datosVehiculo.patente, datosVehiculo.anioDeFabricacion, capacidadDeCarga);
            }
        };
    
        // Verifica si el tipo es una clave válida en creadores
        if (tipo in creadores) {
            vehiculo = creadores[tipo](); // Asignación segura de vehiculo
        }
    
        if (vehiculo) {
            this.agregarListaVehiculos(vehiculo);
            console.log(`${vehiculo.constructor.name} Agregado Correctamente`);
        } else {
            console.log("Tipo de vehículo no válido");
        }
    
        this.esperarEnter();
    }

    private crearVehiculo(): { marca: string; modelo: string; patente: string; anioDeFabricacion: number } {
        let marca: string = rls.question("Ingrese Marca del Vehiculo: ");
        let modelo: string = rls.question("Ingrese Modelo del Vehiculo: ");
        let patente: string = rls.question("Ingrese Patente del Vehiculo: ");
        let anioDeFabricacion: number = rls.questionInt("Ingrese Año de Fabricacion: ");
        return { marca, modelo, patente, anioDeFabricacion };
    }

    private verVehiculos(): void {
        let opcionSeleccionada: number;
        do {
            opcionSeleccionada = this.menuOpciones(`¿Qué tipo de Vehículo desea ver? \n 1 - Auto. \n 2 - Moto. \n 3 - Camión. \n 4 - Todos. \n 5 - Salir`, 1, 5);
            if (opcionSeleccionada < 5) {
                this.listarVehiculosPorTipo(opcionSeleccionada);
            }
        } while (opcionSeleccionada !== 5);
    }

    private listarVehiculosPorTipo(tipo: number): void {
        let vehiculos: Vehiculo[];

        switch (tipo) {
            case 1: 
                vehiculos = this.listaVehiculos.filter(vehiculo => vehiculo instanceof Auto); 
                break;
            case 2: 
                vehiculos = this.listaVehiculos.filter(vehiculo => vehiculo instanceof Moto); 
                break;
            case 3: 
                vehiculos = this.listaVehiculos.filter(vehiculo => vehiculo instanceof Camion); 
                break;
            case 4: 
                vehiculos = this.listaVehiculos; 
                break;
            default:
                console.log("Tipo de vehículo no válido.");
                return; // Salir si el tipo no es válido
        }

        if (vehiculos.length > 0) {
            console.log(`Listado de vehiculos:`);
            vehiculos.forEach(vehiculo => vehiculo.mostrarDetalle());
        } else {
            console.log(`No hay vehículos de este tipo para mostrar.`);
        }
        
        this.esperarEnter();
    }

    private modificarVehiculo(): void {
        let opcionSeleccionada: number;
        do {
            opcionSeleccionada = this.menuOpciones(`¿Qué tipo de Vehículo desea modificar? \n 1 - Auto. \n 2 - Moto. \n 3 - Camión. \n 4 - Salir`, 1, 4);
            if (opcionSeleccionada < 4) {
                this.modificarVehiculoPorTipo(opcionSeleccionada);
            }
        } while (opcionSeleccionada !== 4);
    }

    private modificarVehiculoPorTipo(tipo: number): void {
        let patente: string = rls.question("Ingrese la Patente del vehículo: ");
        let vehiculoSeleccionado: Vehiculo | undefined = this.listaVehiculos.find(v => v.getPatente() === patente);
        
        if (vehiculoSeleccionado) {
            vehiculoSeleccionado.mostrarDetalle();
            let nuevaMarca: string = rls.question("Ingrese nueva marca (o presione Enter para no modificar): ");
            let nuevoModelo: string = rls.question("Ingrese nuevo modelo (o presione Enter para no modificar): ");
            let nuevoAnio: number = rls.questionInt("Ingrese nuevo año (o 0 para no modificar): ");

            if (nuevaMarca) vehiculoSeleccionado.setMarca(nuevaMarca);
            if (nuevoModelo) vehiculoSeleccionado.setModelo(nuevoModelo);
            if (nuevoAnio !== 0) vehiculoSeleccionado.setAnioDeFabricacion(nuevoAnio);

            console.log(`${vehiculoSeleccionado.constructor.name} modificado correctamente`);
        } else {
            console.log(`No existe un ${tipo === 1 ? 'Auto' : tipo === 2 ? 'Moto' : 'Camión'} con esa Patente`);
        }
        this.esperarEnter();
    }

    private eliminarVehiculo(): void {
        let opcionSeleccionada: number;
        do {
            opcionSeleccionada = this.menuOpciones(`¿Qué tipo de Vehículo desea eliminar? \n 1 - Auto. \n 2 - Moto. \n 3 - Camión. \n 4 - Salir`, 1, 4);
            if (opcionSeleccionada < 4) {
                this.eliminarVehiculoPorTipo(opcionSeleccionada);
            }
        } while (opcionSeleccionada !== 4);
    }

    private eliminarVehiculoPorTipo(tipo: number): void {
        let patente: string = rls.question("Ingrese la Patente del Vehículo: ");
        let vehiculoSeleccionado: Vehiculo | undefined = this.listaVehiculos.find(v => v.getPatente() === patente);
        
        if (vehiculoSeleccionado) {
            vehiculoSeleccionado.mostrarDetalle();
            if (rls.keyInYNStrict(`¿Está seguro que desea eliminar el ${vehiculoSeleccionado.constructor.name}?`)) {
                this.listaVehiculos = this.listaVehiculos.filter(v => v !== vehiculoSeleccionado);
                console.log(`${vehiculoSeleccionado.constructor.name} eliminado con éxito.`);
            } else {
                console.log("Eliminación cancelada.");
            }
        } else {
            console.log(`No existe un ${tipo === 1 ? 'Auto' : tipo === 2 ? 'Moto' : 'Camión'} con esa Patente`);
        }
        this.esperarEnter();
    }

    private menuOpciones(mensaje: string, min: number, max: number): number {
        let opcionSeleccionada: number;
        do {
            console.log(mensaje);
            opcionSeleccionada = rls.questionInt("Ingrese la Opcion que Desee: ");
        } while (opcionSeleccionada < min || opcionSeleccionada > max);
        return opcionSeleccionada;
    }

    private agregarListaVehiculos(vehiculo: Vehiculo): void {
        this.listaVehiculos.push(vehiculo);
    }

    private esperarEnter(): void {
        rls.question("Presione Enter para continuar...");
    }
}