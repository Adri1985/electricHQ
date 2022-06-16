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
    constructor(marca, modelo, tipo, velMaxima, precio, topFeature1, topFeature2, topFeature3, imageName){
        this.marca = marca;
        this.modelo = modelo,
        this.tipo = tipo,
        this.velMaxima = velMaxima;
        this.precio = precio;
        this.topFeature1 = topFeature1;
        this.topFeature2 = topFeature2;
        this.topFeature3 = topFeature3;
        this.imageName = imageName;
    }
}

const productos=[];
productos.push(new Producto ("Evolve", "Hadean Carbon 2", "Skateboard", 30, 400,"AT and Street wheels","30mph top speed", "35% hill climbing ability", "product1.png" ));

productos.push(new Producto ("Meepo", "V4 Shuffle", "Skateboard", 25, 100,"Dual 620W motors","Weight 16 lbs", "New M4S remote", "product12.png"));

productos.push(new Producto ("Meepo", "Mini 2 Standard", "Skateboard", 30, 300,"29 mph top speed","versatile deck", "18 miles range", "product3.png"));

productos.push(new Producto ("Eunorau", "FAT-HS 1000", "Bike", 25, 400,"Shimano Deore 9-speed shifter","1000W Bafang motor", "40-mile range", "product4.png"));

productos.push(new Producto ("Jupiter", "Defiant", "Bike", 20, 1000,
"300 lbs payload capacity","ront & rear disc brakes", "750W brushless hub motor", "product5.png"));

productos.push(new Producto ("Rambo", "Bushwacker", "Bike", 30, 400,"Rambo Custom built chain rim","Digital on-board display", "Tektro hydraulic piston brakes", "product6.png" ));

productos.push(new Producto ("Yamaha", "RDS300", "SeaScooter", 25, 100,"Run up to 1.5 hours","Rated to 100ft / 30m", "Waterproof construction", "product7.png"));

productos.push(new Producto ("Eunorau", "Carve Surfboard", "Electric Surfboard", 25, 400,"Jetpack G3","Acceleration: 0-25 in 9.7s", "Board Weight: 20 lbs", "product8.png"));

function listProducts(){
    let container = document.getElementsByClassName("products");

    for (const producto of productos){
        let product = document.createElement("div");
        product.className = "product";
        let card = document.createElement("div");
        card.className = "card";
        card.style="width: 100%";
        let image= document.createElement("img");
        image.src=producto.imageName;
        image.className = "card-img-top w-100 h-100";
        image.alt=producto.modelo;
        let cardBody = document.createElement("div");
        cardBody.className="card-body";
        cardBody.innerHTML = `<h5 class="card-title">${producto.marca}${producto.modelo}</h5>
        <p class="card-text">Top features include:</p>`;
        let listGroup = document.createElement("ul");
        listGroup.className = "list-group list-group-flush";
        listGroup.innerHTML = `<li class="list-group-item">${producto.topFeature1}</li>
        <li class="list-group-item">${producto.topFeature2}</li>
        <li class="list-group-item">${producto.topFeature3}</li>`
        let button = document.createElement("a");
        buttonBuy.className="btn btn-warning";
        buttonBuy.textContent="BUY NOW";
        buttonReview = document.createElement("a");
        buttonReview.className = "btn btn-light";
        buttonReview.textContent = "ADD TO FAVORITES";
        buttonHeart = document.createElement("i");
        buttonHeart.className="bi bi-heart";


        /*<i class="bi bi-heart"></i>*/
        card.append(image);
        card.append(cardBody);
        card.append(listGroup);
        card.append(buttonBuy);
        card.append(buttonReview);
        card.append(buttonHeart);
        product.append(card);
    }
    container.append(product);

}


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


