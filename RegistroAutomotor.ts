import * as rls from 'readline-sync';
import {Vehiculo} from "./Vehiculo";
import {Auto} from "./Auto";
import {Moto} from "./Moto";
import {Camion} from "./Camion";
export class RegistroAutomotor{
    private nombre:string;
    private listaVehiculos:Vehiculo[];
    
    constructor(nombre:string){
        this.nombre = nombre;
        this.listaVehiculos = [];
    }
    opcionesVehiculos():void{
        let opcionSeleccionada : number;
        do {
            console.log(`Opciones \n 1 - Agregar Vehiculo \n 2 - Ver Vehiculos \n 3 - Modificar un Vehiculo \n 4 - Eliminar Vehiculo \n 5 - Salir`);
            opcionSeleccionada = rls.questionInt("Ingrese la Opcion que Desee: ");
            while (opcionSeleccionada<1 || opcionSeleccionada>5){
                opcionSeleccionada = rls.questionInt("Seleccione el numero que figura en la opcion: \n 1 - Agregar. \n 2 - Ver. \n 3 - Modificar. \n 4 - Eliminar. \n 5 - Salir ");
            }
            
                switch (opcionSeleccionada){
                    case 1 : this.agregarVehiculo();
                    break;
                    case 2 : this.verVehiculos();
                    break;
                    case 3 : this.modificarVehiculo();
                    break;
                    case 4 : this.eliminarVehiculo();
                    break;
                    case 5 : console.log("Saliendo...");
                    break;
                    default: console.log("Error de Datos");
                }
            
        }while(opcionSeleccionada!==5);
    }

    agregarVehiculo():void{
        let opcionSeleccionada : number ;
        do {
        console.log(`Que vehiculo desea Agregar \n 1 - Auto. \n 2 - Moto. \n 3 - Camion. \n 4 - Salir.`);
        opcionSeleccionada = rls.questionInt("Ingrese la Opcion que Desee: ");
            while (opcionSeleccionada<1 || opcionSeleccionada>4){
                opcionSeleccionada = rls.questionInt("Seleccione \n 1 - Auto. \n 2 - Moto. \n 3 - Camion. \n 4 - Salir. ");
            }
            
                switch (opcionSeleccionada){
                    case 1 : this.crearAuto();
                    opcionSeleccionada=4;
                    break;
                    case 2 : this.crearMoto();
                    opcionSeleccionada=4;
                    break;
                    case 3 : this.crearCamion();
                    opcionSeleccionada=4;
                    break;
                    case 4 : console.log("Saliendo...");
                    break;
                    default: console.log("Error de Datos");
                }

            } while (opcionSeleccionada !== 4);
    }
    
    crearAuto():void{
        let datosVehiculo = this.crearVehiculo();
        let cantidadDePuertas : number = rls.questionInt("Ingrese Cantidad De Puertas: ");
        let auto : Auto = new Auto(datosVehiculo.marca,datosVehiculo.modelo,datosVehiculo.patente,datosVehiculo.anioDeFabricacion,cantidadDePuertas);
        this.agregarListaVehiculos(auto);
        console.log("Auto Agregado Correctamente");
        this.esperarEnter();
    };

    crearMoto():void{
        let datosVehiculo = this.crearVehiculo();
        let cilindrada : number = rls.questionInt("Ingrese Cilindrada: ");
        let moto : Moto = new Moto(datosVehiculo.marca,datosVehiculo.modelo,datosVehiculo.patente,datosVehiculo.anioDeFabricacion,cilindrada);
        this.agregarListaVehiculos(moto);
        console.log("Moto Agregada Correctamente");
        this.esperarEnter();                
    };

    crearCamion():void{
        let datosVehiculo = this.crearVehiculo();
        let capacidadDeCarga : number = rls.questionInt("Ingrese Capacidad de Carga: ");
        let camion : Camion = new Camion(datosVehiculo.marca,datosVehiculo.modelo,datosVehiculo.patente,datosVehiculo.anioDeFabricacion,capacidadDeCarga);
        this.agregarListaVehiculos(camion);
        console.log("Camion Agregado Correctamente");
        this.esperarEnter();
    };

    agregarListaVehiculos(vehiculo:Vehiculo):void{
        this.listaVehiculos.push(vehiculo);
    }

    crearVehiculo(){
        let marca: string = rls.question("Ingrese Marca del Vehiculo: ");
        let modelo: string = rls.question("Ingrese Modelo del Vehiculo: ");
        let patente: string = rls.question("Ingrese Patente del Vehiculo: ");
        let anioDeFabricacion: number = rls.questionInt("Ingrese Año de Fabricacion: ");
        return { marca, modelo, patente, anioDeFabricacion };
    }
    
    listarAutos(): void {
        const autos = this.listaVehiculos.filter(vehiculo => vehiculo instanceof Auto);
        
        if (autos.length > 0) {
            console.log("Listado de Autos:");
            autos.forEach(vehiculo => vehiculo.mostrarDetalle());
        } else {
            console.log("No hay Autos para mostrar.");
        }
        this.esperarEnter();
    }

    listarMotos(): void {
        const motos = this.listaVehiculos.filter(vehiculo => vehiculo instanceof Moto);
        
        if (motos.length > 0) {
            console.log("Listado de Motos:");
            motos.forEach(vehiculo => vehiculo.mostrarDetalle());
        } else {
            console.log("No hay Motos para mostrar.");
        }
        this.esperarEnter();
    }

    listarCamiones(): void {
        const camiones = this.listaVehiculos.filter(vehiculo => vehiculo instanceof Camion);
        
        if (camiones.length > 0) {
            console.log("Listado de Camiones:");
            camiones.forEach(vehiculo => vehiculo.mostrarDetalle());
        } else {
            console.log("No hay Camiones para mostrar.");
        }
        this.esperarEnter();
    }

    listarVehiculos(): void {
        if (this.listaVehiculos.length > 0) {
            console.log("Listado de Vehículos:");
            this.listaVehiculos.forEach(vehiculo => {
                vehiculo.mostrarDetalle();
            });
        } else {
            console.log("No hay vehículos para mostrar.");
        }
        this.esperarEnter();
    }
    

    verVehiculos():void{
        let opcionSeleccionada : number ;
        do{
        console.log(`Que tipo de Vehiculo desea ver  \n 1 - Auto. \n 2 - Moto. \n 3 - Camion. \n 4 - Todos. \n 5 - Salir`);
        opcionSeleccionada = rls.questionInt("Ingrese la Opcion que Desee: ");
            while (opcionSeleccionada<1 || opcionSeleccionada>5){
                opcionSeleccionada = rls.questionInt("Seleccione \n 1 - Auto. \n 2 - Moto. \n 3 - Camion. \n 4 - Todos. \n 5 - Salir ");
            }
            
                switch (opcionSeleccionada){
                    case 1 : this.listarAutos();
                    opcionSeleccionada=5;
                    break;
                    case 2 : this.listarMotos();
                    opcionSeleccionada=5;
                    break;
                    case 3 : this.listarCamiones();
                    opcionSeleccionada=5;
                    break;
                    case 4 : this.listarVehiculos();
                    opcionSeleccionada=5;
                    break;
                    case 5 : console.log("Saliendo...");
                    break;
                    default: console.log("Error de Datos");
                }
        } while(opcionSeleccionada!==5);      
    }
    
    modificarVehiculo():void{
        let opcionSeleccionada : number ;
        do{
        console.log(`Que tipo de Vehiculo desea modificar  \n 1 - Auto. \n 2 - Moto. \n 3 - Camion. \n 4 - Salir`);
        opcionSeleccionada = rls.questionInt("Ingrese la Opcion que Desee: ");
            while (opcionSeleccionada<1 || opcionSeleccionada>4){
                opcionSeleccionada = rls.questionInt("Seleccione \n 1 - Auto. \n 2 - Moto. \n 3 - Camion. \n 4 - Salir ");
            }
            
                switch (opcionSeleccionada){
                    case 1 : this.modificarAuto();
                    opcionSeleccionada=4;
                    break;
                    case 2 : this.modificarMoto();
                    opcionSeleccionada=4;
                    break;
                    case 3 : this.modificarCamion();
                    opcionSeleccionada=4;
                    break;
                    case 4 : console.log("Saliendo...");
                    break;
                    default: console.log("Error de Datos");
                }
        } while(opcionSeleccionada!==4); 
    }

    modificarAuto(): void {
        let patenteAuto: string = rls.question("Ingrese la Patente del vehículo: ");
        
        // Encuentra el vehículo y asegúrate de que es un Auto
        let vehiculoSeleccionado: Vehiculo | undefined = this.listaVehiculos.find(
            vehiculo => vehiculo.getPatente() === patenteAuto
        );
    
        // Verifica si vehiculoSeleccionado es un Auto
        if (vehiculoSeleccionado instanceof Auto) {
            const autoSeleccionado: Auto = vehiculoSeleccionado; // Asigna a autoSeleccionado
            
            // Muestra los detalles del auto seleccionado
            autoSeleccionado.mostrarDetalle();
    
            // Pide los nuevos datos
            let nuevaMarca: string = rls.question("Ingrese nueva marca (o presione Enter para no modificar): ");
            let nuevoModelo: string = rls.question("Ingrese nuevo modelo (o presione Enter para no modificar): ");
            let nuevoAnio: number = rls.questionInt("Ingrese nuevo año (o 0 para no modificar): ");
            let nuevoCantPuertas: number = rls.questionInt("Ingrese cantidad de puertas (o 0 para no modificar): ");
    
            // Modifica las propiedades del auto
            if (nuevaMarca) {
                autoSeleccionado.setMarca(nuevaMarca);
            }
            if (nuevoModelo) {
                autoSeleccionado.setModelo(nuevoModelo);
            }
            if (nuevoAnio !== 0) {
                autoSeleccionado.setAnioDeFabricacion(nuevoAnio);
            }
            if (nuevoCantPuertas !== 0) {
                autoSeleccionado.setCantidadDePuertas(nuevoCantPuertas);
            }
    
            console.log("Auto Modificado Correctamente");
            this.esperarEnter();
    
        } else {
            console.log("No existe Auto con esa Patente");
            this.esperarEnter();
        }
    }
    

    modificarMoto(): void {
        let patenteMoto: string = rls.question("Ingrese la Patente del vehículo: ");
        
        // Encuentra el vehículo y asegúrate de que es una Moto
        let vehiculoSeleccionado: Vehiculo | undefined = this.listaVehiculos.find(
            vehiculo => vehiculo.getPatente() === patenteMoto
        );
    
        // Verifica si vehiculoSeleccionado es una Moto
        if (vehiculoSeleccionado instanceof Moto) {
            const motoSeleccionada: Moto = vehiculoSeleccionado; // Asigna a motoSeleccionada
    
            // Muestra los detalles de la moto seleccionada
            motoSeleccionada.mostrarDetalle();
    
            // Pide los nuevos datos
            let nuevaMarca: string = rls.question("Ingrese nueva marca (o presione Enter para no modificar): ");
            let nuevoModelo: string = rls.question("Ingrese nuevo modelo (o presione Enter para no modificar): ");
            let nuevoAnio: number = rls.questionInt("Ingrese nuevo año (o 0 para no modificar): ");
            let nuevoCilindrada: number = rls.questionInt("Ingrese cilindrada (o 0 para no modificar): ");
    
            // Modifica las propiedades de la moto
            if (nuevaMarca) {
                motoSeleccionada.setMarca(nuevaMarca);
            }
            if (nuevoModelo) {
                motoSeleccionada.setModelo(nuevoModelo);
            }
            if (nuevoAnio !== 0) {
                motoSeleccionada.setAnioDeFabricacion(nuevoAnio);
            }
            if (nuevoCilindrada !== 0) {
                motoSeleccionada.setCilindrada(nuevoCilindrada);
            }
    
            console.log("Moto Modificada Correctamente");
            this.esperarEnter();
    
        } else {
            console.log("No existe Moto con esa Patente");
            this.esperarEnter();
        }
    }

    modificarCamion(): void {
        let patenteCamion: string = rls.question("Ingrese la Patente del vehículo: ");
        
        // Encuentra el vehículo y asegúrate de que es un Camion
        let vehiculoSeleccionado: Vehiculo | undefined = this.listaVehiculos.find(
            vehiculo => vehiculo.getPatente() === patenteCamion
        );
    
        // Verifica si vehiculoSeleccionado es un Camion
        if (vehiculoSeleccionado instanceof Camion) {
            const camionSeleccionado: Camion = vehiculoSeleccionado; // Asigna a camionSeleccionado
    
            // Muestra los detalles del camión seleccionado
            camionSeleccionado.mostrarDetalle();
    
            // Pide los nuevos datos
            let nuevaMarca: string = rls.question("Ingrese nueva marca (o presione Enter para no modificar): ");
            let nuevoModelo: string = rls.question("Ingrese nuevo modelo (o presione Enter para no modificar): ");
            let nuevoAnio: number = rls.questionInt("Ingrese nuevo año (o 0 para no modificar): ");
            let nuevaCapacidadDeCarga: number = rls.questionInt("Ingrese capacidad de carga (o 0 para no modificar): ");
    
            // Modifica las propiedades del camión
            if (nuevaMarca) {
                camionSeleccionado.setMarca(nuevaMarca);
            }
            if (nuevoModelo) {
                camionSeleccionado.setModelo(nuevoModelo);
            }
            if (nuevoAnio !== 0) {
                camionSeleccionado.setAnioDeFabricacion(nuevoAnio);
            }
            if (nuevaCapacidadDeCarga !== 0) {
                camionSeleccionado.setCapacidadDeCarga(nuevaCapacidadDeCarga);
            }
    
            console.log("Camión Modificado Correctamente");
            this.esperarEnter();
    
        } else {
            console.log("No existe Camión con esa Patente");
            this.esperarEnter();
        }
    }

    eliminarVehiculo():void{
        let opcionSeleccionada : number ;
        do{
        console.log(`Que tipo de Vehiculo desea eliminar  \n 1 - Auto. \n 2 - Moto. \n 3 - Camion. \n 4 - Salir`);
        opcionSeleccionada = rls.questionInt("Ingrese la Opcion que Desee: ");
            while (opcionSeleccionada<1 || opcionSeleccionada>4){
                opcionSeleccionada = rls.questionInt("Seleccione \n 1 - Auto. \n 2 - Moto. \n 3 - Camion. \n 4 - Salir ");
            }
            
                switch (opcionSeleccionada){
                    case 1 : this.eliminarAuto();
                    opcionSeleccionada=4;
                    break;
                    case 2 : this.eliminarMoto();
                    opcionSeleccionada=4;
                    break;
                    case 3 : this.eliminarCamion();
                    opcionSeleccionada=4;
                    break;
                    case 4 : console.log("Saliendo...");
                    break;
                    default: console.log("Error de Datos");
                }
        } while(opcionSeleccionada!==4);
    }

    eliminarAuto(): void {
        let patenteAuto: string = rls.question("Ingrese la Patente del Auto: ");
        
        // Busca el vehículo en la lista de vehículos
        let vehiculoSeleccionado: Vehiculo | undefined = this.listaVehiculos.find(
            vehiculo => vehiculo.getPatente() === patenteAuto
        );
    
        // Verifica si el vehículo encontrado es un Auto
        if (vehiculoSeleccionado instanceof Auto) {
            const autoSeleccionado: Auto = vehiculoSeleccionado;
            
            // Muestra los detalles del auto seleccionado
            autoSeleccionado.mostrarDetalle();
            
            // Pregunta al usuario si está seguro de eliminar
            console.log("¿Está seguro que desea eliminar? \nIngrese 1 si está seguro \nIngrese 2 para regresar sin eliminar:");
            let seguro: number = rls.questionInt("");
    
            if (seguro === 1) {
                // Filtra la lista para eliminar el auto seleccionado
                this.listaVehiculos = this.listaVehiculos.filter((vehiculo) => vehiculo !== autoSeleccionado);
                console.log("Auto eliminado con éxito.");
            } else {
                console.log("Eliminación cancelada.");
            }
        } else {
            console.log("No existe un Auto con esa Patente.");
        }
    
        this.esperarEnter(); // Espera que el usuario presione Enter antes de continuar
    }

    eliminarMoto(): void {
        let patenteMoto: string = rls.question("Ingrese la Patente de la Moto: ");
        
        // Busca el vehículo en la lista de vehículos
        let vehiculoSeleccionado: Vehiculo | undefined = this.listaVehiculos.find(
            vehiculo => vehiculo.getPatente() === patenteMoto
        );
    
        // Verifica si el vehículo encontrado es una Moto
        if (vehiculoSeleccionado instanceof Moto) {
            const motoSeleccionada: Moto = vehiculoSeleccionado;
    
            // Muestra los detalles de la moto seleccionada
            motoSeleccionada.mostrarDetalle();
            
            // Pregunta al usuario si está seguro de eliminar
            console.log("¿Está seguro que desea eliminar? \nIngrese 1 si está seguro \nIngrese 2 para regresar sin eliminar:");
            let seguro: number = rls.questionInt("");
    
            if (seguro === 1) {
                // Filtra la lista para eliminar la moto seleccionada
                this.listaVehiculos = this.listaVehiculos.filter((vehiculo) => vehiculo !== motoSeleccionada);
                console.log("Moto eliminada con éxito.");
            } else {
                console.log("Eliminación cancelada.");
            }
        } else {
            console.log("No existe una Moto con esa Patente.");
        }
    
        this.esperarEnter(); // Espera que el usuario presione Enter antes de continuar
    }

    eliminarCamion(): void {
        let patenteCamion: string = rls.question("Ingrese la Patente del Camión: ");
        
        // Busca el vehículo en la lista de vehículos
        let vehiculoSeleccionado: Vehiculo | undefined = this.listaVehiculos.find(
            vehiculo => vehiculo.getPatente() === patenteCamion
        );
    
        // Verifica si el vehículo encontrado es un Camión
        if (vehiculoSeleccionado instanceof Camion) {
            const camionSeleccionado: Camion = vehiculoSeleccionado;
    
            // Muestra los detalles del camión seleccionado
            camionSeleccionado.mostrarDetalle();
            
            // Pregunta al usuario si está seguro de eliminar
            console.log("¿Está seguro que desea eliminar? \nIngrese 1 si está seguro \nIngrese 2 para regresar sin eliminar:");
            let seguro: number = rls.questionInt("");
    
            if (seguro === 1) {
                // Filtra la lista para eliminar el camión seleccionado
                this.listaVehiculos = this.listaVehiculos.filter((vehiculo) => vehiculo !== camionSeleccionado);
                console.log("Camión eliminado con éxito.");
            } else {
                console.log("Eliminación cancelada.");
            }
        } else {
            console.log("No existe un Camión con esa Patente.");
        }
    
        this.esperarEnter(); // Espera que el usuario presione Enter antes de continuar
    }

    esperarEnter():void{
        console.log("Presione Enter Para continuar");
        rls.question('');
    }
}