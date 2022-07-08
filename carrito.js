function mostrarCarrito()
{   
        console.log("entra en mostrar carrito "+carritoArray.length);
        let carritoDom = document.getElementById("carrito");
        let cant=document.getElementById("cantidad");
        cant.innerHTML="";
        
        if(carritoArray.length>0)
        {
            console.log("entra en >0");
            cant.innerHTML=`<p style="color:orange;">${carritoArray.length}</p>`
        }
        

       
        let carro=document.getElementById("img");
            carro.addEventListener('click',()=>{
                if(carritoArray.length>0){
                    finalizarCompra();
                }else
                {
                    Swal.fire("Cart is empty");
                }

                
            });
          
            
}

mostrarCarrito();