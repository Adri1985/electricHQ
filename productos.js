class Producto{
    constructor(marca, modelo, tipo, rango, precio, topFeature1, topFeature2, topFeature3, imageName){
        this.marca = marca;
        this.modelo = modelo,
        this.tipo = tipo,
        this.rango = rango;
        this.precio = precio;
        this.topFeature1 = topFeature1;
        this.topFeature2 = topFeature2;
        this.topFeature3 = topFeature3;
        this.imageName = imageName;
    }
}

const productos=[];
productos.push(new Producto ("Evolve", "Hadean Carbon 2", "Skateboard", 30, 400,"AT and Street wheels","30mph top speed", "35% hill climbing ability", "product1.png" ));

productos.push(new Producto ("Meepo", "V4 Shuffle", "Skateboard", 25, 100,"Dual 620W motors","Weight 16 lbs", "New M4S remote", "product2.png"));

productos.push(new Producto ("Meepo", "Mini 2 Standard", "Skateboard", 30, 300,"29 mph top speed","versatile deck", "18 miles range", "product3.png"));

productos.push(new Producto ("Eunorau", "FAT-HS 1000", "Bike", 25, 400,"Shimano Deore 9-speed shifter","1000W Bafang motor", "40-mile range", "product4.png"));

productos.push(new Producto ("Jupiter", "Defiant", "Bike", 20, 1000,
"300 lbs payload capacity","ront & rear disc brakes", "750W brushless hub motor", "product5.png"));

productos.push(new Producto ("Rambo", "Bushwacker", "Bike", 30, 400,"Rambo Custom built chain rim","Digital on-board display", "Tektro hydraulic piston brakes", "product6.png" ));

productos.push(new Producto ("Yamaha", "RDS300", "SeaScooter", 25, 100,"Run up to 1.5 hours","Rated to 100ft / 30m", "Waterproof construction", "product7.png"));

productos.push(new Producto ("Eunorau", "Carve Surfboard", "Electric Surfboard", 25, 400,"Jetpack G3","Acceleration: 0-25 in 9.7s", "Board Weight: 20 lbs", "product8.png"));


listProducts(productos);

createSelectType();


//createSelectType va a crear el primer drop down dentro del formulario de producto, listando solo aquellos tipos de productos en stock
//se alimenta del array principal de producto, tomando los tipos y eliminando duplicados.
function createSelectType(){
    const tipos=[];
    let first = 0;
    //primero creo el array tipos leyendo el array original y eliminando los duplicados.
    for(const producto of productos){
        if (first == 0){
            tipos.push(producto);
            console.log(producto);
            first = 1;
        }
        else
        {
            if(tipos.find((el)=> el.tipo == producto.tipo)==undefined){
                console.log("encuentra "+tipos.find((el)=> el.tipo == producto.tipo));
                tipos.push(producto);
            }
            
        }
        
    }
    console.log("tamaño de tipos"+tipos.length);
    for(const tipo of tipos){
        console.log("Tipos: "+tipo.tipo);
    }

    //aca, tomo el formulario y cre un nuevo select mostrando como tipos, los del array construido mas arriba
    let types = document.getElementById("formulario");
    let select = document.createElement("select");
    select.className = "form-select form-select w-100 mb-3";
    select.id = "selectTipo";
    select.innerHTML = `<option selected>Vehicle type</option>`;
    select.innerHTML = select.innerHTML+`<option value=0 >All Types</option>`;
    let iteracion = 0;
    for(const tipo of tipos){
        iteracion++;
        select.innerHTML = select.innerHTML+`<option value="${iteracion}">${tipo.tipo}</option>`
    }

    types.prepend(select);
    

}

let minPrecio = document.getElementById("minPrecio");
let maxPrecio = document.getElementById("maxPrecio");
let minRange = document.getElementById("minRange");
let maxRange = document.getElementById("maxRange");

minPrecio.addEventListener('input', () => {
    if(isNaN(minPrecio.value)){
        alert("el precio debe ser numerico");
        minPrecio.value="";
    }
    else if(minPrecio.value <0 )
    {   
        alert("el precio debe ser mayor a 0");
        minPrecio.value="";
    }
});
maxPrecio.addEventListener('input', () => {
    if(isNaN(maxPrecio.value)){
        alert("el precio debe ser numerico");
        maxPrecio.value="";
    }
    else if(maxPrecio.value <0 )
    {   
        alert("el precio debe ser mayor a 0");
        maxPrecio.value="";
    } 
});
minRange.addEventListener('input', () => {
    if(isNaN(minRange.value)){
        alert("el rango debe ser numerico");
        minRange.value="";
    }
    else if(minRange.value <0 )
    {   
        alert("el rango debe ser mayor a 0");
        minRange.value="";
    }  
});
maxRange.addEventListener('input', () => {
    if(isNaN(maxRange.value)){
        alert("el rango debe ser numerico");
        maxRange.value="";
    }
    else if(maxRange.value <0 )
    {   
        alert("el rango debe ser mayor a 0");
        maxRange.value="";
    }   
});

let boton = document.getElementById("botonBusqueda");
boton.addEventListener("click", buscar);

function buscar(){
    let porPrecio = 0;
    let porRango = 0;
    let minPrecioFloat = parseFloat(minPrecio.value);
    let maxPrecioFloat = parseFloat(maxPrecio.value);
    let minRangoFloat = parseFloat(minRange.value);
    let maxRangoFloat = parseFloat(maxRange.value);

    console.log("min precio antes "+minPrecio.value+" max precio antes "+maxPrecioFloat);
    
   
    if(minPrecioFloat != "min price" && maxPrecioFloat!="max price")
    {
        if(minPrecioFloat < maxPrecioFloat ){
            porPrecio = 1;
        }
        else{
            alert("el precio minimo tiene que ser mayor al precio maximo");
        }
    }
    if(minRangoFloat !="min range" && maxRangoFloat !="max range")
    {
        if(minRangoFloat < maxRangoFloat){
            porRango = 1;
        }
        else{
            alert("el rango minimo tiene que ser mayor al rango maximo");
        }
    }
    
    let seleccion  = document.getElementById("selectTipo");
    let selected =seleccion.options[seleccion.selectedIndex].text;
    console.log(selected);
    console.log("por precio "+porPrecio+" por Rango "+porRango+" MinPrecio"+ minPrecioFloat+ " maxPrecio "+maxPrecioFloat+" minRango "+minRangoFloat+" maxRango "+maxRangoFloat);
 
    if(porPrecio == 1 && porRango == 0 && (selected.toLowerCase()=="vehicle type"||selected.toLowerCase()=='all types'))// busqueda por precio
    {
         const resultado = productos.filter((el) => el.precio >= minPrecioFloat && el.precio<= maxPrecioFloat);
         console.log("por precio");
         listProducts(resultado);
    }
    if(porPrecio == 1 && porRango == 1 && (selected.toLowerCase()=="vehicle type"||selected.toLowerCase()=='all types')) // busqueda por precio y rango
    {
        const resultado = productos.filter((el) => el.precio >= minPrecioFloat && el.precio<= maxPrecioFloat && el.rango >= minRangoFloat && el.rango <= maxRangoFloat);
         console.log("por precio y rango"); 
         listProducts(resultado);
    }
    if(porPrecio == 0 && porRango == 1 && (selected.toLowerCase()=="vehicle type"||selected.toLowerCase()=='all types')) // busqueda por rango
    {
        const resultado = productos.filter((el) => el.rango >= minRangoFloat && el.rango <= maxRangoFloat); 
         console.log("por rango");
         listProducts(resultado);
    }

    if(porPrecio == 1 && porRango == 0 && selected.toLowerCase()!="vehicle type" && selected.toLowerCase()!='all types')// busqueda por precio y tipo
    {
        const resultado = productos.filter((el) => el.precio >= minPrecioFloat && el.precio<= maxPrecioFloat && el.tipo.toLowerCase() == selected.toLowerCase());
         console.log("por precio y tipo");
         listProducts(resultado); 
    }
    if(porPrecio == 0 && porRango == 1 && selected.toLowerCase()!="vehicle type" && selected.toLowerCase()!='all types') // busqueda por rango y tipo
    {
        const resultado = productos.filter((el) => el.rango >= minRangoFloat && el.rango <= maxRangoFloat && el.tipo.toLowerCase()  == selected.toLowerCase()); 
         console.log("rango y tipo");
         listProducts(resultado);
    }
    if(porPrecio == 1 && porRango == 1 && selected.toLowerCase()!="vehicle type" && selected.toLowerCase()!='all types') // busqueda por precio rango y tipo
    {
        const resultado = productos.filter((el) => el.precio >= minPrecioFloat && el.precio<= maxPrecioFloat && el.rango >= minRangoFloat && el.rango <= maxRangoFloat && el.tipo.toLowerCase()  == selected.toLowerCase()); 
         console.log("por precio, rango y tipo");
         listProducts(resultado);
    }
    if(porPrecio == 0 && porRango == 0 && selected.toLowerCase()!="vehicle type" && selected.toLowerCase()!='all types') // Solo por tipo
    {
        const resultado = productos.filter((el) => el.tipo.toLowerCase() == selected.toLowerCase()); 
        console.log("productos "+productos.length);
        console.log("resultado "+resultado.length); 
        
        console.log("Solo por tipo");
        listProducts(resultado);
    }


    if(porPrecio == 0 && porRango == 0 && (selected.toLowerCase()=="vehicle type"||selected.toLowerCase()=='all types')) // All
    {
         console.log("all types");
         listProducts(productos);
    }

    
    
      


}

function listProducts(lista){
    console.log("Lista con tamaño: "+lista.length);
    let container = document.getElementById("products");
    container.innerHTML=``;
    let product;
    for (const producto of lista){
        product = document.createElement("div");
        product.className = "product";
        let card = document.createElement("div");
        card.className = "card";
        card.style="width: 100%";
        let image= document.createElement("img");
        image.src="../images/"+producto.imageName;
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
        <li class="list-group-item">${producto.topFeature3}</li>
        <li class="list-group-item">Price: $${producto.precio}</li>
        <li class="list-group-item">Max Range: ${producto.rango} Miles</li>`

        let buttonBuy = document.createElement("a");
        buttonBuy.className="btn btn-warning";
        buttonBuy.textContent="BUY NOW";
        let buttonReview = document.createElement("a");
        buttonReview.className = "btn btn-light";
        buttonReview.textContent = "REQUEST REVIEW";
        card.appendChild(image);
        card.appendChild(cardBody);
        card.appendChild(listGroup);
        card.appendChild(buttonBuy);
        card.appendChild(buttonReview);
        product.appendChild(card);
        container.appendChild(product);
    }
  
    

}