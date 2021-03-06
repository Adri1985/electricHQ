let likedIds = [];
let carritoStorage =[];
const productos = [];
var carritoArray = [];
let encontrado;
let carrito=[];
//como este js lo llaman tanto desde el index como desde pages/ necesitaba construir una forma de acceder a los archivos cambiando la ruta, no encontre otra forma de resolverlo

let path = location.toString();
arrayPath= path.split('/');
let pagina = arrayPath.pop();
let ruta="./";
if(pagina !="index.html"&& pagina !=''){
    ruta = "../";
}

//funcion principal para obtener el listado de productos de productos.json
function obtenerProductosJson() {
    const URLJSON = ruta+"productos.json";
    fetch(URLJSON)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            for (const producto of data.productos) {
                productos.push(new Producto(producto.id, producto.marca, producto.modelo, producto.tipo, producto.rango, producto.precio, producto.topFeature1, producto.topFeature2, producto.topFeature3, producto.imageName, producto.liked));
            }
            //setInterval(console.log("waiting for productos", 1000));
            setFromStorage();// mapea con el storage
            mostrarCarrito();// muestra el carrito
            if(pagina=="products.html")// solo ejecuta lo necesario para productos
            {
                createSelectType(); 
                validations();
                setLikeButton();
                listProducts(productos);
            }
        })
}

obtenerProductosJson();


function setLikeButton()// setea los likes
{
    let showLikes =document.getElementById("likes");
    showLikes.addEventListener('click',()=>{
        const resultado = productos.filter((el) => el.liked.toLowerCase() == "y");
        Toastify({
            text: "Showing liked products",
            duration: 1500,
        }).showToast();
        listProducts(resultado);
    })
}

function setFromStorage() {//setea del storage tanto los likes como el carrito en los correspondientes arrays
    let likedArrayFromStorage = localStorage.getItem("liked");
    let cartFromStorage = localStorage.getItem("cart");
    if (likedArrayFromStorage != null) {
        likedIds = JSON.parse(likedArrayFromStorage);
        for (const producto of productos) {
            for (i = 0; i < likedIds.length; i++) {
                if (producto.id == likedIds[i]) {
                    producto.liked = "Y";
                }
            }

        }

    }
    if(cartFromStorage != null){
        cart = JSON.parse(cartFromStorage);
        console.log("from storage cart "+cart);
        for(const producto of productos){
            for (i = 0; i < cart.length; i++) {
                if (producto.id == cart[i]) {
                    carritoArray.push(producto)
                    carritoStorage.push(producto.id);
                }
            }

        }
        console.log("storage carrito "+carritoArray.length);
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
            first = 1;
        }
        else {
            if (tipos.find((el) => el.tipo == producto.tipo) == undefined) {
                tipos.push(producto);
            }

        }

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
    }
    console.log("iteracion fuera " + iteracion);
    types.prepend(select);


}

//Funcion encargada de validar los campos de busqueda.
function validations() {

    let minPrecio = document.getElementById("minPrecio");
    let maxPrecio = document.getElementById("maxPrecio");
    let minRange = document.getElementById("minRange");
    let maxRange = document.getElementById("maxRange");
    let countries = document.getElementById("countries");
    countries.disabled = true;

    minPrecio.addEventListener('input', () => {
        if (isNaN(minPrecio.value)) {
            Toastify({
                text: "Price must be a number",
                duration: 1500,
            }).showToast();
            minPrecio.value = "";
        }
        else if (minPrecio.value < 0) {
            Toastify({
                text: "Price must be greater than 0",
                duration: 1500,
            }).showToast();
           
            minPrecio.value = "";
        }
    });
    maxPrecio.addEventListener('input', () => {
        if (isNaN(maxPrecio.value)) {
            Toastify({
                text: "price must be greather than 0",
                duration: 1500,
            }).showToast();
            maxPrecio.value = "";
        }
        else if (maxPrecio.value < 0) {
            Toastify({
                text: "price must be greather than 0",
                duration: 1500,
            }).showToast();
            maxPrecio.value = "";
        }
    });
    minRange.addEventListener('input', () => {
        if (isNaN(minRange.value)) {
            Toastify({
                text: "min range must be a number",
                duration: 1500,
            }).showToast();
            minRange.value = "";
        }
        else if (minRange.value < 0) {
            Toastify({
                text: "min range must be greater than 0",
                duration: 1500,
            }).showToast();
            minRange.value = "";
        }
    });
    maxRange.addEventListener('input', () => {
        if (isNaN(maxRange.value)) {
            Toastify({
                text: "max range must be a number",
                duration: 1500,
            }).showToast();
            maxRange.value = "";
        }
        else if (maxRange.value < 0) {
            Toastify({
                text: "max range must be a number",
                duration: 1500,
            }).showToast();
            maxRange.value = "";
        }
    });

  

    let seleccion = document.getElementById("selectTipo");

    seleccion.addEventListener('change', function () {
        let selectedFav = seleccion.options[seleccion.selectedIndex].text;
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
    let boton = document.getElementById("botonBusqueda");
    boton.addEventListener("click", buscar);

}
// funcion de busqueda en funcion de los filtros.
function buscar() {
    let porPrecio = 0;
    let porRango = 0;
    let minPrecioFloat = parseFloat(minPrecio.value);
    let maxPrecioFloat = parseFloat(maxPrecio.value);
    let minRangoFloat = parseFloat(minRange.value);
    let maxRangoFloat = parseFloat(maxRange.value);
    if(isNaN(minPrecioFloat))
    {
        minPrecioFloat=0;
    }
    if(isNaN(maxPrecioFloat))
    {
        maxPrecioFloat=999999999999;
    }
    if(isNaN(minRangoFloat)){
        minRangoFloat=0;
    }
    if(isNaN(maxRangoFloat))
    {
        maxRangoFloat=9999999999999;
    }
    //Operadores especiales, utilizacion de &&
    if (minPrecioFloat != "min price" && maxPrecioFloat != "max price") {
        porPrecio = minPrecioFloat < maxPrecioFloat && 1;
    }
    if (minRangoFloat != "min range" && maxRangoFloat != "max range") {
        porRango = minRangoFloat < maxRangoFloat && 1;


    }
    let seleccion = document.getElementById("selectTipo");
    let selected = seleccion.options[seleccion.selectedIndex].text;
    if (porPrecio == 1 && porRango == 0 && (selected.toLowerCase() == "vehicle type" || selected.toLowerCase() == 'all types'))// busqueda por precio
    {
        const resultado = productos.filter((el) => el.precio >= minPrecioFloat && el.precio <= maxPrecioFloat);
        listProducts(resultado);
    }
    if (porPrecio == 1 && porRango == 1 && (selected.toLowerCase() == "vehicle type" || selected.toLowerCase() == 'all types')) // busqueda por precio y rango
    {
        const resultado = productos.filter((el) => el.precio >= minPrecioFloat && el.precio <= maxPrecioFloat && el.rango >= minRangoFloat && el.rango <= maxRangoFloat);
        listProducts(resultado);
    }
    if (porPrecio == 0 && porRango == 1 && (selected.toLowerCase() == "vehicle type" || selected.toLowerCase() == 'all types')) // busqueda por rango
    {
        const resultado = productos.filter((el) => el.rango >= minRangoFloat && el.rango <= maxRangoFloat);
        listProducts(resultado);
    }

    if (porPrecio == 1 && porRango == 0 && selected.toLowerCase() != "vehicle type" && selected.toLowerCase() != 'all types')// busqueda por precio y tipo
    {
        const resultado = productos.filter((el) => el.precio >= minPrecioFloat && el.precio <= maxPrecioFloat && el.tipo.toLowerCase() == selected.toLowerCase());
        listProducts(resultado);
    }
    if (porPrecio == 0 && porRango == 1 && selected.toLowerCase() != "vehicle type" && selected.toLowerCase() != 'all types') // busqueda por rango y tipo
    {
        const resultado = productos.filter((el) => el.rango >= minRangoFloat && el.rango <= maxRangoFloat && el.tipo.toLowerCase() == selected.toLowerCase());
        listProducts(resultado);
    }
    if (porPrecio == 1 && porRango == 1 && selected.toLowerCase() != "vehicle type" && selected.toLowerCase() != 'all types') // busqueda por precio rango y tipo
    {
        const resultado = productos.filter((el) => el.precio >= minPrecioFloat && el.precio <= maxPrecioFloat && el.rango >= minRangoFloat && el.rango <= maxRangoFloat && el.tipo.toLowerCase() == selected.toLowerCase());
        listProducts(resultado);
    }
    if (porPrecio == 0 && porRango == 0 && selected.toLowerCase() != "vehicle type" && selected.toLowerCase() != 'all types') // Solo por tipo
    {
        const resultado = productos.filter((el) => el.tipo.toLowerCase() == selected.toLowerCase()); 
        listProducts(resultado);
    }


    if (porPrecio == 0 && porRango == 0 && (selected.toLowerCase() == "vehicle type" || selected.toLowerCase() == 'all types')) // All
    {
       
        listProducts(productos);
    }
}

//funcion encargada de mostrar los productos, segun el array que reciba. genera dinamicamente cards de boostrap
function listProducts(lista) {
    let container = document.getElementById("products");
    container.innerHTML = ``;
    let product;
    for (const producto of lista) {
        // Desesctructuracion del objeto producto
        let { precio, rango, imageName, topFeature1, topFeature2, topFeature3, id, modelo, marca } = producto;
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
        liked.id = "like" + id;
        liked.className = "bi bi-card-image"
        likeCont.appendChild(liked);
        //Desestructuracion de producto tomando solo imageName
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
        if (carritoArray.some((el) => el.id == producto.id)) 
        {
            buttonBuy.className = "btn btn-secondary";
            buttonBuy.textContent = "REMOVE FROM CART";
        }
        else
        {
            buttonBuy.className = "btn btn-warning";
            buttonBuy.textContent = "ADD TO CART";
        }
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
        liked.addEventListener('click', () => {
            if (producto.liked == "Y") {
                producto.liked = "N";
                liked.src = "../images/unliked.png";
                likedIds.pop(producto.id);
                localStorage.setItem("liked", JSON.stringify(likedIds));
                Toastify({
                    text: "Unliked!",
                    duration: 2000
                }).showToast();
            }
            else {
                producto.liked = "Y";
                liked.src = "../images/liked.png";
                likedIds.push(producto.id);
                localStorage.setItem("liked", JSON.stringify(likedIds));
                Toastify({
                    text: "Liked!",
                    duration: 2000,
                }).showToast();
            }
        });
        buttonBuy.addEventListener('click',()=>{
        if(buttonBuy.textContent == "REMOVE FROM CART")
        {
            carritoArray.pop(producto);
            carritoStorage.pop(producto.id);
            localStorage.setItem("cart", JSON.stringify(carritoStorage));
            buttonBuy.className ="btn btn-warning";
            buttonBuy.textContent ="ADD TO CART";
            mostrarCarrito();
        }
        else
        {    
            if (carritoArray.some((el) => el.id == producto.id)) 
            {
                Swal.fire("Product already in cart. You can modify quantity at checkout process");
            }
            else
            {
                Swal.fire(
                producto.tipo + " " + producto.modelo + " " + "agregado al carrito");
                let iteracion;
                let total = 0;
                carritoStorage.push(producto.id);
                localStorage.setItem("cart", JSON.stringify(carritoStorage));
                carritoArray.push(producto); 
                buttonBuy.className = "btn btn-secondary";
                buttonBuy.textContent ="REMOVE FROM CART";
                mostrarCarrito();
            }         
        }
        });
    
    }
}
  
// funcion que renderiza el contenedor principal de la pagina, generando un modelo de checkout de boostrap
//en funion del array del carrito. 
//Al finalizarl a compra envia un mail al cliente utilizando la libreria de email.js, o tambien, 
//cuenta con la opcion de seguir comprando
function finalizarCompra() {
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
    title.style="color:black;"
    title.innerText = "Your products";
    div7.appendChild(title);
    let divProd1;
    let totalInicial=0;
    for (const item of carritoArray) {
        totalInicial=totalInicial+parseFloat(item.precio);
        divProd1 = document.createElement("div");
        divProd1.className = "d-flex align-items-center mb-5";
        let divProd2 = document.createElement("div");
        divProd2.className = "flex-shrink-0";
        let imageProd = document.createElement("img");
        imageProd.src = ruta+"images/"+item.imageName;
        imageProd.className = "img-fluid";
        imageProd.style = "width: 150px;"
        imageProd.alt = "Generic placeholder image"
        divProd2.appendChild(imageProd);
        let divProd3 = document.createElement("div");
        divProd3.className = "flex-grow-1 ms-3";//append abajo
        divProd3.innerHTML =`<a href="#!" class="float-end text-black"><i class="fas fa-times"></i></a>
        <h5 class="prod_checkout">${item.marca} ${item.modelo}</h5`;
        let divProd4 = document.createElement("div");
        divProd4.className = "d-flex align-items-center";
        divProd4.innerHTML = 
        `<p class="fw-bold mb-0 me-5 pe-3">${item.precio}$</p>`
        let divProd5 = document.createElement("div");
        divProd5.className = "def-number-input number-input safari_only";
        let input = document.createElement("input");
        input.className = "quantity fw-bold text-black";
        input.min = "0";
        input.name = "quantity";
        input.value = "1";
        input.type = "number";
        input.id = "input"+item.id;
        let button = document.createElement("button");
        button.className = "minus";
        button.addEventListener('click', ()=>{
            let cant = parseInt(input.value)-1;
            if (cant >=0)
            {
                input.value = cant;
                totalInicial = totalInicial-parseFloat(item.precio);
                item.cantCarrito--; 
                let divTotal=document.getElementById("divTotal");
                divTotal.innerHTML=`<h4 class="fw-bold mb-0 totales">Total:</h4>
                <h4 class="fw-bold mb-0 totales">${totalInicial}$</h4>
                `
            }
            
            
        })
        
        let button2 = document.createElement("button");
        button2.className = "plus";
        button2.addEventListener('click', ()=>{
            input.value = parseInt(input.value)+1;
            item.cantCarrito++;
            totalInicial = totalInicial+parseFloat(item.precio);
            let divTotal=document.getElementById("divTotal");
            divTotal.innerHTML=`<h4 class="fw-bold mb-0 totales">Total:</h4>
            <h4 class="fw-bold mb-0 totales">${totalInicial}$</h4>
            `
        })
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
    let div8 = document.createElement("div");
    div8.className ="col-lg-6 px-5 py-4";
    div8.innerHTML=`
    <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase" style="color:black;">Payment </h3>
                  <form class="mb-5">
                    <div class="form-outline mb-5">
                    <input type="email" id="email" name="email" id="typemail" class="form-control form-control-lg" siez="17"
                    value="" minlength="5" maxlength="99" />
                  <label class="form-label" for="typeText">your email</label>
                      <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                        value="1234 5678 9012 3457" minlength="19" maxlength="19" />
                      <label class="form-label" for="typeText">Card Number</label>
                    </div>
                    <div class="form-outline mb-5">
                      <input type="text" id="typeName" class="form-control form-control-lg" siez="17" required
                        value="" />
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
                    <button type="button" id="fin" class="btn btn-warning btn-block btn-lg">Buy now</button>
                    <button type="button" id="empty" class="btn btn-info btn-block btn-lg">Empty Cart</button>
  
                    <h5 class="fw-bold mb-5" style="position: absolute; bottom: 0;">
                      <a href="${ruta}/pages/products.html" id="continueShopping"><i class="fas fa-angle-left me-2"></i>Back to shopping</a>
                    </h5>`
    div6.appendChild(div7);
    div6.appendChild(div8);
    div5.appendChild(div6);
    div4.appendChild(div5);
    div3.appendChild(div4);
    div2.appendChild(div3);
    div1.appendChild(div2);
    sectionPrincipal.appendChild(div1); 
    contenedorCheckout.appendChild(sectionPrincipal);
    let clear = document.getElementById("empty");
    clear.addEventListener('click', ()=>{
        localStorage.removeItem('cart');
        Swal.fire("Cart cleared.")
        setTimeout(()=>{
            window.location.replace(ruta+"pages/products.html");
        }, 2000);

    })
    let fin = document.getElementById("fin");
    fin.addEventListener('click', () => {          
        let mail = document.getElementById("email").value;
        let nombre = document.getElementById("typeName".value);
        if (mail =="" || nombre =="")
        {   
            Swal.fire("Name and email are mandatory")

        }
        else
        {   
            let titulo ="Detalle de su compra: ";
            let resumen =""
        for (const producto of carritoArray)
        {
            resumen = resumen+producto.cantCarrito+"X "+producto.tipo+" "+producto.modelo+"\nPrecio: "+producto.precio+"$     /";

        }
        resumen = resumen +"\n";
        let total= "Total de su compra: $"+totalInicial;
        let saludo = "Equipo de ElectricHQ"  
        var templateParams = {
            correo: mail,
            from: nombre,
            title:titulo,
            mensaje:resumen,
            totals:total,
            greeting:saludo
           
          };

          //send email
          emailjs.send("default_service", "template_3lckjpo", templateParams).then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );

        localStorage.clear();
        Swal.fire("Thanks for shopping ElectricHQ! you will send your purchase summary to your email.")
        setTimeout(()=>{
            window.location.replace(ruta+"index.html");
        }, 3000);
        }   
    })
}







