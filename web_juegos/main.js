// variable

var carritoVisible = false;

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready()
}

function ready(){
    

    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }



    var botonesAgregarCarrito = document.getElementsByClassName('formulario_submit');
    for(var i=0;i<botonesAgregarCarrito.length;i++){
        var button = botonesAgregarCarrito[i];
        button.addEventListener('click',agregarAlCarritoCliked);
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarCliked);
}



function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItemns = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for (var i =0 ; i < carritoItemns.length; i++) {
        var item = carritoItemns[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var precio = precioElemento.innerText.replace('$', '');

        var cantidaditem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidaditem.value;
          // Usa innerText en lugar de value
        total = total + (precio * cantidad);
    }

    total = Math.round(total * 50) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("en");
}


function ocultarCarrito(){
    var carritoItemns = document.getElementsByClassName('carrito-items') [0];
    if(carritoItemns.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity='0';
        carritoVisible = false;
        
        var items = document.getElementsByClassName('grid')[0];
        items.style.width = '100%';
    }
}

function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    console.log(cantidadActual);
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
    
}

function agregarAlCarritoCliked(event){
    event.preventDefault();  // Corrección aquí
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('producto_nombre')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('producto_precio')[0].innerText;
    var imagenSrc = item.getElementsByClassName('producto_imagen')[0].src;
    console.log(imagenSrc);
    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacervisibleCarrito();
}
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add('carrito-item'); // Corrección aquí
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    var nombreItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombreItemsCarrito.length; i++) {
        if (nombreItemsCarrito[i].innerText == titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" alt="">
            <div class="carrito-item-detalles" >
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="number" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            
        </div>
    `

    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

   

    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);
}

function pagarCliked(event){
    alert("Gracias por su compra");

    var carritoItemns = document.getElementsByClassName('carrito-items')[0];
    while(carritoItemns.hasChildNodes()){
        carritoItemns.removeChild(carritoItemns.firstChild);
    }
    actualizarTotalCarrito();

    ocultarCarrito();
}
function hacervisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1'; // Corrección aquí

    var items = document.getElementsByClassName('contenedor')[0];
    items.style.width = '80%';
}