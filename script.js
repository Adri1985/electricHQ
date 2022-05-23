class Invitado{
    constructor(nombre, edad, comoNosConocio, pais, vehiculo, interes){
        this.nombre = nombre;
        this.edad = edad;
        this.comoNosConocio = comoNosConocio;
        this.pais = pais;
        this.vehiculo = vehiculo;
        this.interes = interes;
       
    }
    aplicarDescuento(descuento){
        this.descuento = descuento;
    }
    
    mostrarDatos(){
        alert("Bienvenido/a "+this.nombre+", debajo sus datos y el descuento obtenido. Personalizaremos su sitio para una mejor experiencia.");
        console.log("Nombre: "+this.nombre);
        console.log("Edad: "+this.edad);
        console.log("comoNosConocio: "+this.comoNosConocio);
        console.log("Pais: "+this.pais);
        console.log("Vehiculo electrico que posee: "+this.vehiculo);
        console.log("Intereses: "+this.interes);
        console.log("Descuento de Bienvenida: "+this.descuento+"%");

    }
    
    

   
}

function validarComoNosConocio(){
    let conocio= prompt("Como nos conociste? Selecciona las siguientes opciones: Referido / Instagram / Facebook / Youtube / Otro.");
    while(conocio != "Referido" && conocio != "Instagram" && conocio != "Facebook" && conocio != "Youtube" && conocio !="Otro"){
         conocio= prompt("Por favor valida las opciones. Como nos conociste?: Referido / Instagram / Facebook / Youtube / Otro.");
    }
    return conocio;
}

function validarVehiculo(){
    let vehiculo = prompt("Tenes alguno de estos vehiculos electricos?. Cual?: Scooter/Skate/Moto/Otro/Ninguno. " );
    while(vehiculo != "Scooter" && vehiculo != "Skate" && vehiculo != "Moto" && vehiculo != "Ninguno" && vehiculo !="Otro"){
        vehiculo= prompt("Por favor valida las opciones. enes alguno de estos vehiculos electricos?. Cual?: Scooter/Skate/Moto/Otro/Ninguno.");
   }
   return vehiculo;
}

function calcularDescuento(Invitado){
    if(Invitado.edad > 65){
        Invitado.aplicarDescuento(20);
    }else{
        Invitado.aplicarDescuento(10);
    }
}

let nombre = prompt ("Bienvenido a Electir HQ, antes de empezar, como te llamas?");
let edad = prompt ("Hola "+nombre+"!!, que edad tenes?");
let pais = prompt ("Gracias! algunas preguntas mas, no la haremos muy larga. Desde que pais nos visitas? ");
let comoNosConocio = validarComoNosConocio();
let vehiculo = validarVehiculo();
let interes = prompt ("Por ultimo, dejanos saber que andas buscando!.");

const Invitado1 = new Invitado(nombre, edad, comoNosConocio, pais, vehiculo, interes);
let descuento = calcularDescuento(Invitado1);
Invitado1.mostrarDatos();


