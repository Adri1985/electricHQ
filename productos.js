let likedIds = [];

const productos = [];
let carritoArray = [];
let carritoArrayFinal =[];
let encontrado;

function obtenerProductosJson() {
    console.log("antes del fetch");
    const URLJSON = "../productos.json";
    fetch(URLJSON)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log("data " + data.productos);
            for (const producto of data.productos) {
                productos.push(new Producto(producto.id, producto.marca, producto.modelo, producto.tipo, producto.rango, producto.precio, producto.topFeature1, producto.topFeature2, producto.topFeature3, producto.imageName, producto.liked));
            }
            console.log("productos de json " + productos);

            createSelectType();
            setFromStorage();

            listProducts(productos);
            validations();

        })
    console.log("despues del fetch");
}

obtenerProductosJson();


class Producto {
    constructor(id, marca, modelo, tipo, rango, precio, topFeature1, topFeature2, topFeature3, imageName, liked) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo,
            this.tipo = tipo;
        this.rango = rango;
        this.precio = precio;
        this.topFeature1 = topFeature1;
        this.topFeature2 = topFeature2;
        this.topFeature3 = topFeature3;
        this.imageName = imageName;
        this.liked = liked;
    }
}

class CarritoItem{
    constructor(producto, cant){
        this.producto = producto;
        this.cant = cant
    };
}



function setFromStorage() {
    let likedArrayFromStorage = localStorage.getItem("liked");
    if (likedArrayFromStorage != null) {
        likedIds = JSON.parse(likedArrayFromStorage);
        console.log("likeIds");


        for (const producto of productos) {
            for (i = 0; i < likedIds.length; i++) {
                if (producto.id == likedIds[i]) {
                    producto.liked = "Y";
                }
            }

        }

    }
}


//createSelectType va a crear el primer drop down dentro del formulario de producto, listando solo aquellos tipos de productos en stock
//se alimenta del array principal de producto, tomando los tipos y eliminando duplicados.
function createSelectType() {
    const tipos = [];
    let first = 0;
    //primero creo el array tipos leyendo el array original y eliminando los duplicados.
    for (const producto of productos) {
        if (first == 0) {
            tipos.push(producto);
            console.log(producto);
            first = 1;
        }
        else {
            if (tipos.find((el) => el.tipo == producto.tipo) == undefined) {
                console.log("encuentra " + tipos.find((el) => el.tipo == producto.tipo));
                tipos.push(producto);
            }

        }

    }
    console.log("tamaño de tipos" + tipos.length);
    for (const tipo of tipos) {
        console.log("Tipos: " + tipo.tipo);
    }

    //aca, tomo el formulario y cre un nuevo select mostrando como tipos, los del array construido mas arriba
    let types = document.getElementById("formulario");
    let select = document.createElement("select");
    select.className = "form-select form-select w-100 mb-3";
    select.id = "selectTipo";
    select.innerHTML = `<option selected>Vehicle type</option>`;
    select.innerHTML = select.innerHTML + `<option value=0 >All Types</option>`;

    let iteracion = 0;
    for (const tipo of tipos) {
        iteracion++;
        select.innerHTML = select.innerHTML + `<option value="${iteracion}">${tipo.tipo}</option>`
        console.log("iteracion " + iteracion);
    }
    iteracion++;
    select.innerHTML = select.innerHTML + `<option value="${iteracion}">My Favorites</option>`;

    console.log("iteracion fuera " + iteracion);

    types.prepend(select);


}

function validations() {

    let minPrecio = document.getElementById("minPrecio");
    let maxPrecio = document.getElementById("maxPrecio");
    let minRange = document.getElementById("minRange");
    let maxRange = document.getElementById("maxRange");
    let countries = document.getElementById("countries");
    let newCheck = document.getElementById("new");
    let preOwnedCheck = document.getElementById("preowned");
    countries.disabled = true;
    preOwnedCheck.disabled = true;
    newCheck.disabled = true;

    minPrecio.addEventListener('input', () => {
        if (isNaN(minPrecio.value)) {
            alert("el precio debe ser numerico");
            minPrecio.value = "";
        }
        else if (minPrecio.value < 0) {
            alert("el precio debe ser mayor a 0");
            minPrecio.value = "";
        }
    });
    maxPrecio.addEventListener('input', () => {
        if (isNaN(maxPrecio.value)) {
            alert("el precio debe ser numerico");
            maxPrecio.value = "";
        }
        else if (maxPrecio.value < 0) {
            alert("el precio debe ser mayor a 0");
            maxPrecio.value = "";
        }
    });
    minRange.addEventListener('input', () => {
        if (isNaN(minRange.value)) {
            alert("el rango debe ser numerico");
            minRange.value = "";
        }
        else if (minRange.value < 0) {
            alert("el rango debe ser mayor a 0");
            minRange.value = "";
        }
    });
    maxRange.addEventListener('input', () => {
        if (isNaN(maxRange.value)) {
            alert("el rango debe ser numerico");
            maxRange.value = "";
        }
        else if (maxRange.value < 0) {
            alert("el rango debe ser mayor a 0");
            maxRange.value = "";
        }
    });

    /*let temperatura = 31;
    temperatura>30? console.log("hace calor"): console.log("no hace calor"); porque aca no funciona?*/

    let seleccion = document.getElementById("selectTipo");

    seleccion.addEventListener('change', function () {
        let selectedFav = seleccion.options[seleccion.selectedIndex].text;
        console.log('You selected: ', selectedFav);
        if (selectedFav.toLowerCase() == "my favorites") {
            console.log("selecciono my favorites");
            minPrecio.disabled = true;
            maxPrecio.disabled = true;
            minRange.disabled = true;
            maxRange.disabled = true;
        }
        else {
            minPrecio.disabled = false;
            maxPrecio.disabled = false;
            minRange.disabled = false;
            maxRange.disabled = false;
        }
    });
    let selected = seleccion.options[seleccion.selectedIndex].text;




    let boton = document.getElementById("botonBusqueda");
    boton.addEventListener("click", buscar);

}

function buscar() {
    let porPrecio = 0;
    let porRango = 0;
    let minPrecioFloat = parseFloat(minPrecio.value);
    let maxPrecioFloat = parseFloat(maxPrecio.value);
    let minRangoFloat = parseFloat(minRange.value);
    let maxRangoFloat = parseFloat(maxRange.value);


    console.log("min precio antes " + minPrecio.value + " max precio antes " + maxPrecioFloat);

    //Operadores especiales, utilizacion de &&
    if (minPrecioFloat != "min price" && maxPrecioFloat != "max price") {
        porPrecio = minPrecioFloat < maxPrecioFloat && 1;
    }
    if (minRangoFloat != "min range" && maxRangoFloat != "max range") {
        porRango = minRangoFloat < maxRangoFloat && 1;


    }


    let seleccion = document.getElementById("selectTipo");
    let selected = seleccion.options[seleccion.selectedIndex].text;


    console.log("Seleccionado antes " + selected);
    console.log("por precio " + porPrecio + " por Rango " + porRango + " MinPrecio" + minPrecioFloat + " maxPrecio " + maxPrecioFloat + " minRango " + minRangoFloat + " maxRango " + maxRangoFloat);

    if (porPrecio == 1 && porRango == 0 && (selected.toLowerCase() == "vehicle type" || selected.toLowerCase() == 'all types'))// busqueda por precio
    {
        const resultado = productos.filter((el) => el.precio >= minPrecioFloat && el.precio <= maxPrecioFloat);
        console.log("por precio");
        listProducts(resultado);
    }
    if (porPrecio == 1 && porRango == 1 && (selected.toLowerCase() == "vehicle type" || selected.toLowerCase() == 'all types')) // busqueda por precio y rango
    {
        const resultado = productos.filter((el) => el.precio >= minPrecioFloat && el.precio <= maxPrecioFloat && el.rango >= minRangoFloat && el.rango <= maxRangoFloat);
        console.log("por precio y rango");
        listProducts(resultado);
    }
    if (porPrecio == 0 && porRango == 1 && (selected.toLowerCase() == "vehicle type" || selected.toLowerCase() == 'all types')) // busqueda por rango
    {
        const resultado = productos.filter((el) => el.rango >= minRangoFloat && el.rango <= maxRangoFloat);
        console.log("por rango");
        listProducts(resultado);
    }

    if (porPrecio == 1 && porRango == 0 && selected.toLowerCase() != "vehicle type" && selected.toLowerCase() != 'all types')// busqueda por precio y tipo
    {
        const resultado = productos.filter((el) => el.precio >= minPrecioFloat && el.precio <= maxPrecioFloat && el.tipo.toLowerCase() == selected.toLowerCase());
        console.log("por precio y tipo");
        listProducts(resultado);
    }
    if (porPrecio == 0 && porRango == 1 && selected.toLowerCase() != "vehicle type" && selected.toLowerCase() != 'all types') // busqueda por rango y tipo
    {
        const resultado = productos.filter((el) => el.rango >= minRangoFloat && el.rango <= maxRangoFloat && el.tipo.toLowerCase() == selected.toLowerCase());
        console.log("rango y tipo");
        listProducts(resultado);
    }
    if (porPrecio == 1 && porRango == 1 && selected.toLowerCase() != "vehicle type" && selected.toLowerCase() != 'all types') // busqueda por precio rango y tipo
    {
        const resultado = productos.filter((el) => el.precio >= minPrecioFloat && el.precio <= maxPrecioFloat && el.rango >= minRangoFloat && el.rango <= maxRangoFloat && el.tipo.toLowerCase() == selected.toLowerCase());
        console.log("por precio, rango y tipo");
        listProducts(resultado);
    }
    if (porPrecio == 0 && porRango == 0 && selected.toLowerCase() != "vehicle type" && selected.toLowerCase() != 'all types') // Solo por tipo
    {
        const resultado = productos.filter((el) => el.tipo.toLowerCase() == selected.toLowerCase());
        console.log("productos " + productos.length);
        console.log("resultado " + resultado.length);

        console.log("Solo por tipo");
        listProducts(resultado);
    }


    if (porPrecio == 0 && porRango == 0 && (selected.toLowerCase() == "vehicle type" || selected.toLowerCase() == 'all types')) // All
    {
        console.log("all types");
        listProducts(productos);
    }

    console.log("lo que esta seleccionado es " + selected.toLowerCase());
    if (porPrecio == 0 && porRango == 0 && selected.toLowerCase() == "my favorites") // All
    {

        const resultado = productos.filter((el) => el.liked.toLowerCase() == "y");
        console.log("likeados");
        listProducts(resultado);
    }






}

function listProducts(lista) {

    let nav = document.getElementById("carrito");

    let carrito = document.createElement("select");
    carrito.className = "form-select form-select w-100 mb-3";
    carrito.id = "carrito";
    carrito.innerHTML = `<option selected>Shopping bag</option>`;
    let buttonCompleteOrder = document.createElement("a");
    buttonCompleteOrder.className = "btn btn-warning";
    buttonCompleteOrder.textContent = "COMPLETE ORDER";
    buttonCompleteOrder.id = "buy";
    console.log("Lista con tamaño: " + lista.length);
    let container = document.getElementById("products");
    container.innerHTML = ``;
    let product;

    for (const producto of lista) {
        // Desesctructuracion del objeto producto
        let { precio, rango, imageName, topFeature1, topFeature2, topFeature3, id, modelo, marca } = producto;

        console.log("id que llega " + producto.id + " liked o no " + producto.liked);
        product = document.createElement("div");
        product.className = "product";
        let card = document.createElement("div");
        card.className = "card";
        card.style = "width: 100%";

        let likeCont = document.createElement("div");
        likeCont.className = "likeDiv";


        let liked = document.createElement("img");

        //Uso de operador ternario
        producto.liked == "Y" ? liked.src = "../images/liked.png" : liked.src = "../images/unliked.png";
        /*if(producto.liked =="Y")
        {
            liked.src= "../images/liked.png";
        }
        else{
            liked.src= "../images/unliked.png";
        }*/
        liked.id = "like" + id;
        console.log("en la creacion " + liked.id);
        liked.className = "bi bi-card-image"
        likeCont.appendChild(liked);
        //Desestructuracion de producto tomando solo imageName

        console.log("imagen luego de desesctructuracion " + imageName)
        let image = document.createElement("img");
        image.src = "../images/" + imageName;
        image.className = "card-img-top w-100 h-100";
        image.alt = modelo;
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardBody.innerHTML = `<h5 class="card-title">${marca}${modelo}</h5>
        <p class="card-text">Top features include:</p>`;
        let listGroup = document.createElement("ul");
        listGroup.className = "list-group list-group-flush";

        listGroup.innerHTML = `<li class="list-group-item">${topFeature1}</li>
        <li class="list-group-item">${topFeature2}</li>
        <li class="list-group-item">${topFeature3}</li>
        <li class="list-group-item">Price: $${precio}</li>
        <li class="list-group-item">Max Range: ${rango} Miles</li>`

        let buttonBuy = document.createElement("a");
        buttonBuy.className = "btn btn-warning";
        buttonBuy.textContent = "ADD TO CART";
        buttonBuy.id = "buy" + id;
        let buttonReview = document.createElement("a");
        buttonReview.className = "btn btn-light";
        buttonReview.textContent = "REQUEST REVIEW";
        let buttonLike = document.createElement("button");
        buttonLike.className = "btn btn-default swap";
        buttonLike.id = "like";
        let likeSpan = document.createElement("span");
        likeSpan.className = "glyphicon glyphicon-heart-empty";
        card.appendChild(likeCont);
        card.appendChild(image);
        card.appendChild(cardBody);
        card.appendChild(listGroup);
        card.appendChild(buttonBuy);
        card.appendChild(buttonReview);
        card.appendChild(buttonLike);
        product.appendChild(card);
        container.appendChild(product);
    }

    console.log("likeIds en la carga" + likedIds);

    for (const producto of lista) {
        console.log("entra al final " + producto.id);
        let botLike = document.getElementById("like" + producto.id);
        console.log("buscando " + "like" + producto.id);
        botLike.addEventListener('click', () => {
            if (producto.liked == "Y") {
                console.log("disliked");
                producto.liked = "N";
                botLike.src = "../images/unliked.png";
                likedIds.pop(producto.id);
                console.log(likedIds);
                console.log(JSON.stringify(likedIds));
                localStorage.setItem("liked", JSON.stringify(likedIds));
                console.log("antes de toastify");
                Toastify({
                    text: "Unliked!",
                    duration: 2000
                }).showToast();
                console.log("despues de toastify");

            }

            else {
                console.log("liked");
                producto.liked = "Y";
                botLike.src = "../images/liked.png";
                likedIds.push(producto.id);
                console.log(likedIds);
                console.log(JSON.stringify(likedIds));
                localStorage.setItem("liked", JSON.stringify(likedIds));
                Toastify({
                    text: "Liked!",
                    duration: 2000,
                }).showToast();
            }
        });
        let botCart = document.getElementById("buy" + producto.id);

        botCart.addEventListener('click', () => {
            Swal.fire(
            producto.tipo + " " + producto.modelo + " " + "agregado al carrito");
            let iteracion;
            let total = 0;
            
            carritoArray.push(producto);
            console.log("producto agregado al carrito " + producto);
            console.log("carrito array ;" + producto.modelo);
            carrito.innerHTML = `<option selected>Shopping bag (${carritoArray.length})</option>`;
            
            console.log("longitud del carrito "+ carritoArray.length);

           
           
            //prueba
           
            encontrado= carritoArrayFinal.find((el)=>el.producto.id == producto.id);
                
            if (encontrado == undefined)
            {
                    
                console.log("no encontro, hace el push");
                carritoArrayFinal.push(new CarritoItem(producto, 1));
                console.log("producto agregado "+producto.modelo);
            }
            else
            {

                encontrado.cant+=1;
                console.log("encontrado "+encontrado.producto.modelo+" cantidad"+ encontrado.cant)
            }
           
            for (const compra of carritoArray) {
                iteracion++;
                carrito.innerHTML = carrito.innerHTML + `<option value="${iteracion}">${compra.tipo} ${compra.modelo}</option>`
                console.log("iteracion " + iteracion);
                console.log("precio " + compra.precio);
                total += parseFloat(compra.precio);
            }
            iteracion++;
            carrito.innerHTML = carrito.innerHTML + `<option value="${iteracion}">Total:$ ${total}</option>`




            nav.prepend(buttonCompleteOrder);
            nav.prepend(carrito);
            buttonCompleteOrder.addEventListener('click', () => {
                console.log("hacec click");
                finalizarCompra();
            })

        })

    }
    


}

function finalizarCompra() {
    for (const element of carritoArrayFinal)
    {
        console.log("carritoArrayFinal"+ element.producto.modelo+ "cantidad "+element.cant);
    }
    let contenedorCheckout = document.getElementById("principal");
    contenedorCheckout.innerHTML = "";
    let sectionPrincipal = document.createElement("section");
    sectionPrincipal.className = "h-100 h-custom";
    sectionPrincipal.style = "background-color: #eee;";
    let div1 = document.createElement("div");
    div1.className = "container h-100 py-5";
    let div2 = document.createElement("div");
    div2.className = "row d-flex justify-content-center align-items-center h-100";
    let div3 = document.createElement("div");
    div3.className = "col";
    let div4 = document.createElement("div");
    div4.className = "card shopping-cart";
    div4.style = "border-radius: 15px;";
    let div5 = document.createElement("div");
    div5.className = "card-body text-black";
    let div6 = document.createElement("div");
    div6.className = "row";
    let div7 = document.createElement("div");
    div7.className = "col-lg-6 px-5 py-4";
    let title = document.createElement("h3");
    title.innerText = "Your products";
    div7.appendChild(title);
    let divProd1;
    let totalInicial=0;

    for (const item of carritoArrayFinal) {
        console.log("pasa por carrito");
        totalInicial=totalInicial+parseFloat(item.producto.precio)*parseInt(item.cant);
        console.log("totalInicial"+ totalInicial);
        divProd1 = document.createElement("div");
        divProd1.className = "d-flex align-items-center mb-5";
        let divProd2 = document.createElement("div");
        divProd2.className = "flex-shrink-0";
        let imageProd = document.createElement("img");
        imageProd.src = "../images/" + item.producto.imageName;
        imageProd.className = "img-fluid";
        imageProd.style = "width: 150px;"
        imageProd.alt = "Generic placeholder image"
        divProd2.appendChild(imageProd);
        let divProd3 = document.createElement("div");
        divProd3.className = "flex-grow-1 ms-3";//append abajo
        divProd3.innerHTML =`<a href="#!" class="float-end text-black"><i class="fas fa-times"></i></a>
        <h5 class="text-primary">${item.producto.marca} ${item.producto.modelo}</h5`;
        let divProd4 = document.createElement("div");
        divProd4.className = "d-flex align-items-center";
        divProd4.innerHTML = 
        `<p class="fw-bold mb-0 me-5 pe-3">${item.producto.precio}$</p>`
        let divProd5 = document.createElement("div");
        divProd5.className = "def-number-input number-input safari_only";
        let input = document.createElement("input");
        input.className = "quantity fw-bold text-black";
        input.min = "0";
        input.name = "quantity";
        input.value = item.cant;
        input.type = "number";
        input.id = "input"+item.producto.id;
        let button = document.createElement("button");
        button.className = "minus";
        button.addEventListener('click', ()=>{
            console.log("click minus");
            let cant = parseInt(input.value)-1;
            if (cant >=0)
            {
                input.value = cant;
                totalInicial = totalInicial-parseFloat(item.producto.precio);
                let divTotal=document.getElementById("divTotal");
                divTotal.innerHTML=`<h4 class="fw-bold mb-0 totales">Total:</h4>
                <h4 class="fw-bold mb-0 totales">${totalInicial}$</h4>
                `
            }
            
            
        })
        
        let button2 = document.createElement("button");
        button2.className = "plus";
        button2.addEventListener('click', ()=>{
            console.log("click plus");
            input.value = parseInt(input.value)+1;
           
            //totalInicial = totalInicial - producto.precio;
            totalInicial = totalInicial+parseFloat(item.producto.precio);
            
            let divTotal=document.getElementById("divTotal");
            divTotal.innerHTML=`<h4 class="fw-bold mb-0 totales">Total:</h4>
            <h4 class="fw-bold mb-0 totales">${totalInicial}$</h4>
            `
        })
        //console.log("totalPlus"+totalPlus);
        divProd5.appendChild(button);
        divProd5.appendChild(input);
        divProd5.appendChild(button2);
        divProd4.appendChild(divProd5);
        divProd3.appendChild(divProd4);
        divProd2.appendChild(divProd3);
        divProd1.appendChild(divProd2);
        divProd1.appendChild(divProd2);
        div7.appendChild(divProd1);

        
       
        

    }
  
    divTotal = document.createElement("div");
    divTotal.id="divTotal";
    divTotal.className ="d-flex justify-content-between p-2 mb-2";
    divTotal.style="background-color: #e1f5fe;";
    divTotal.innerHTML=`<h4 class="fw-bold mb-0 totales">Total:</h4>
    <h4 class="fw-bold mb-0 totales">${totalInicial}$</h4>
    `
    div7.append(divTotal);
    /*<div class="d-flex justify-content-between p-2 mb-2" style="background-color: #e1f5fe;">
      <h4 class="fw-bold mb-0 totales">Total:</h4>
      <h4 class="fw-bold mb-0 totales">${total}$</h4>
    </div>
    `*/
    let div8 = document.createElement("div");
    div8.className ="col-lg-6 px-5 py-4";
    div8.innerHTML=`
    <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase" style="color:black;">Payment </h3>
                  <form class="mb-5">
                    <div class="form-outline mb-5">
                      <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                        value="1234 5678 9012 3457" minlength="19" maxlength="19" />
                      <label class="form-label" for="typeText">Card Number</label>
                    </div>
                    <div class="form-outline mb-5">
                      <input type="text" id="typeName" class="form-control form-control-lg" siez="17"
                        value="John Smith" />
                      <label class="form-label" for="typeName">Name on card</label>
                    </div>
                    <div class="row">
                      <div class="col-md-6 mb-5">
                        <div class="form-outline">
                          <input type="text" id="typeExp" class="form-control form-control-lg" value="01/22"
                            size="7" id="exp" minlength="7" maxlength="7" />
                          <label class="form-label" for="typeExp">Expiration</label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-5">
                        <div class="form-outline">
                          <input type="password" id="typeText" class="form-control form-control-lg"
                            value="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                          <label class="form-label" for="typeText">Cvv</label>
                        </div>
                      </div>
                    </div>
                    <p class="mb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit <a
                        href="#!">obcaecati sapiente</a>.</p>
                    <button type="button" id="fin" class="btn btn-primary btn-block btn-lg">Buy now</button>
  
                    <h5 class="fw-bold mb-5" style="position: absolute; bottom: 0;">
                      <a href="products.html" id="continueShopping"><i class="fas fa-angle-left me-2"></i>Back to shopping</a>
                    </h5>`
    // sigue a la par del div 7 

    

    div6.appendChild(div7);
    div6.appendChild(div8);
    div5.appendChild(div6);
    div4.appendChild(div5);
    div3.appendChild(div4);
    div2.appendChild(div3);
    div1.appendChild(div2);
    sectionPrincipal.appendChild(div1);
    
    contenedorCheckout.appendChild(sectionPrincipal);

    let fin = document.getElementById("fin");
    fin.addEventListener('click', () => {
        Swal.fire("Thanks for shopping Electric HQ");
    })






    //listProducts(carritoArray);
    /*console.log("entra en finalizar compra");
    let contenedor = document.getElementById("products");
    let contenedorVentas;
    console.log("carritoArray lenght"+carritoArray.length);
        for(const producto of carritoArray){
             contenedorVentas= document.createElement("div");
            let item = document.createElement("ul");
            item.innerHTML=`<li>${producto.modelo}</li>`
            contenedorVentas.appendChild(item);

        }
        contenedor.innerHTML='';
        contenedor.append=contenedorVentas;*/
}

//Storage


let likedProducts = localStorage.getItem("liked");
if (likedProducts != null) {
    let likedProductsJSON = JSON.parse(likedProducts);
    //funcion para setear el like de cada producto por ID

}





