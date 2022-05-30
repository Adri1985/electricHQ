class Invitado{
    constructor(nombre, edad, comoNosConocio, pais, vehiculo){
        this.nombre = nombre;
        this.edad = edad;
        this.comoNosConocio = comoNosConocio;
        this.pais = pais;
        this.vehiculo = vehiculo;
       
       
    }
    aplicarDescuento(descuento){
        this.descuento = descuento;
    }
    
    mostrarDatos(){
        let displayFavoritos = "Sus productos favoritos son:"+"\n";
        for (const fav of this.favoritos)
        {
            displayFavoritos = displayFavoritos +"-"+fav.tipo+" "+fav.marca+" "+fav.modelo+"\n";
        }
        
        let mensaje="Bienvenido/a "+this.nombre+", debajo sus datos y el descuento obtenido. Personalizaremos su sitio para una mejor experiencia."+"\n"+
        "Nombre: "+this.nombre+"\n"+
        "Edad: "+this.edad+"\n"+
        "Nos conocio a traves de: "+this.comoNosConocio+"\n"+
        "Nos visitas desde: "+this.pais+"\n"+
        displayFavoritos+
        " "+"Descuento de Bienvenida: "+this.descuento+"%";

        alert(mensaje);
        
     

    }
    setFavoritos(favoritos){
        this.favoritos = favoritos;
    }
   
}


class Producto{
    constructor(marca, modelo, tipo, velMaxima, precio){
        this.marca = marca;
        this.modelo = modelo,
        this.tipo = tipo,
        this.velMaxima = velMaxima;
        this.precio = precio;
    }
}

const productos=[];
productos.push(new Producto ("Meepo", "Mini 2", "Skateboard", 25, 400));
productos.push(new Producto ("Philco", "C90", "Monopatin", 25, 100));
productos.push(new Producto ("Segway", "Ninebot", "Monopatin", 30, 300));
productos.push(new Producto ("Evolve", "Headen Carbon2", "Skateboard", 25, 400));
productos.push(new Producto ("Yamaha", "RDS300", "WaterSport", 20, 1000));

function validarComoNosConocio(){
    let conocio= prompt("Como nos conociste? Selecciona las siguientes opciones: Referido / Instagram / Facebook / Youtube / Otro.");
    while(conocio.toLocaleLowerCase() != "referido" && conocio.toLocaleLowerCase() != "instagram" && conocio.toLocaleLowerCase() != "facebook" && conocio.toLocaleLowerCase() != "youtube" && conocio.toLocaleLowerCase() !="otro"){
         conocio= prompt("Por favor valida las opciones. Como nos conociste?: Referido / Instagram / Facebook / Youtube / Otro.");
    }
    return conocio;
}

function validarVehiculo(){
    let vehiculo = prompt("Tenes alguno de estos vehiculos electricos?. Cual?: Scooter/Skate/Moto/Otro/Ninguno. " );
    while(vehiculo.toLocaleLowerCase() != "scooter" && vehiculo.toLocaleLowerCase() != "skate" && vehiculo.toLocaleLowerCase() != "moto" && vehiculo.toLocaleLowerCase() != "Ninguno" && vehiculo.toLocaleLowerCase() !="Otro"){
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

function consultarFavoritos(Productos, seleccionados){
    let displayProducto="Por Favor, seleccione sus productos favoritos, escribiendo solo el modelo. Para salir, ingrese Salir: "+"\n"+"\n";
    for (const producto of Productos){
        displayProducto = displayProducto+producto.tipo+" "+producto.marca+" , Modelo:"+producto.modelo+", Vel.Max "+producto.velMaxima+"MPH, precio: "+producto.precio+"USD"+"\n";
        

    }
    displayProducto = displayProducto+"\n";
    return displayProducto+seleccionados;
  
}



let nombre = prompt ("Bienvenido a Electir HQ, antes de empezar, como te llamas?");
let edad = prompt ("Hola "+nombre+"!!, que edad tenes?");
let pais = prompt ("Gracias! algunas preguntas mas, no la haremos muy larga. Desde que pais nos visitas? ");
let comoNosConocio = validarComoNosConocio();
let vehiculo = validarVehiculo();
let consultaFav;
const misFavoritos=[];
let favorito;
let resultado;
let input="";
let seleccionados="Favoritos: ";

consultaFav= consultarFavoritos(productos, seleccionados);
input = prompt(consultaFav);
while(input.toLocaleLowerCase() != "salir")
{
  
    favorito=productos.find(el=> el.modelo.toLocaleLowerCase() == input.toLocaleLowerCase());
    if(favorito != undefined)
    {
        if(misFavoritos.find(el=> el.modelo.toLocaleLowerCase() == favorito.modelo.toLocaleLowerCase())){
            alert("Este producto ya se encuentra en tu lista de Favoritos");
        }
        else{
            alert("Agregado a favoritos: "+favorito.tipo+" "+favorito.marca+" "+favorito.modelo);
            misFavoritos.push(favorito);
            seleccionados = seleccionados + favorito.tipo+ " "+favorito.marca+" "+favorito.modelo+" // ";
            
        }
        
    }
    else
    {
        alert("Producto no encontrado.");
    }
    consultaFav= consultarFavoritos(productos, seleccionados);
    input = prompt(consultaFav);


        
}



const Invitado1 = new Invitado(nombre, edad, comoNosConocio, pais, vehiculo);
let descuento = calcularDescuento(Invitado1);
Invitado1.setFavoritos(misFavoritos);
Invitado1.mostrarDatos();


