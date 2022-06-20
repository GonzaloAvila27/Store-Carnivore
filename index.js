
const products = document.querySelector(".shopitems");

let itemID = 1;
EventListener()
loadJSON()



function EventListener(){
    window.addEventListener("DOMContentLoaded", () => {loadJSON();
    })
    products.addEventListener('click', eventoAgregar);
}
function loadJSON(){
    fetch("products.json")
    .then(response => response.json())
    .then(data => {
        let html = "";
        data.forEach(product => {
            html += `
            <div>
                <div class="shop-item">
                    <span class="shop-item-title">${product.nombre}</span>
                    <img class="shop-item-image" src=${product.imagendisplay}>
                </div>
                <div class="shop-item-details">
                    <span class="shop-item-price">$${product.price}</span>
                    <button class="btn btn-primary bi bi-cart-plus" type="button"> Al carrito</button>
                </div>
            </div>
            `;
            });
            products.innerHTML = html;
            products.classList.add("shopitems")
        })     
        .catch(error => {
            alert("error en el servidor - p#t@ madre")
        } )
        
    } 
    
    //CREAR ROW EN CARRITO
    function eventoAgregar(e){
        if(e.target.classList.contains('bi-cart-plus')){
            let product = e.target.parentElement.parentElement;
            sacarInfo(product);
        }
    }
    function sacarInfo(product){
        let productInfo = {
            id: itemID,
            producto: product.querySelector('.shop-item-title').textContent,
            imagendisplay: product.querySelector('.shop-item-image').src,
            price: product.querySelector('.shop-item-price').textContent
        }
        itemID++;
        addToCarr(productInfo);
    //    guardarProductoStorage(productInfo);
    }
    const cartItems = document.querySelector(".carr-items");
    console.log(cartItems);
    function addToCarr(product){
        const itemCarr = document.createElement('div');
        itemCarr.classList.add("carr-row");
        itemCarr.setAttribute("data-id", `${product.id}`)
        itemCarr.innerHTML = `
        <div class="carr-item carr-column">
        <img class="carr-item-image" src=${product.imagendisplay} width="100" height="100">
        <span class="carr-item-title">${product.producto}</span>
        </div>
        <span class="carr-price carr-column">${product.price}</span>
        <div class="carr-cantidad carr-column">
        <input class="carr-cantidad-input" type="number" value="1">
        <button class="btn btn-danger borrar" type="button">REMOVER</button>
        </div> `;
        cartItems.appendChild(itemCarr)
        totalCarrito()
    }
    /*
    function guardarProductoStorage(item){
        let products = traerProductoStorage();
        products.push(item);
        localStorage.setItem('products', JSON.stringify(products));
    }
    function traerProductoStorage(){
        return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    }
    function cargarCarroStorage (){
        let products = traerProductoStorage();
        if (products.length < 1){
            itemID =1;
        } else {
            itemID = products[products.length - 1 ];
            itemID++
        }
        products.forEach(product => addToCarr(product));
    } */

  /*  function repetido(product) {
     //   let carrItems = document.getElementsByClassName("carr-items")
       // let repetidos = carrItems.getElementsByClassName("carr-item-title")
        for (let i = 0; i < repetidos.length; i++) {
            if (repetidos[i].innerText === product.producto) {
                alert ("El producto ya está en el carrito de compras")
                return
            }       
        }
    }   */
//BTN REMOVER

const removerProducto = document.getElementsByClassName("borrar")
for (let i = 0; i < removerProducto.length; i++){
    let boton = removerProducto[i]
    boton.addEventListener("click", borrarProducto)
}
function borrarProducto(e){
    let clickBoton = e.target 
    clickBoton.parentElement.parentElement.remove()
    totalCarrito()
}
//CANTIDAD LISTENER
/*
const inputCantidad = document.getElementsByClassName("carr-cantidad-input")
for (let i = 0; i < inputCantidad.length; i++){
    let input = inputCantidad[i] 
    input.addEventListener("click", cambioCantidad)
}
function cambioCantidad(e) {
    let input = e.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    totalCarrito()
}         */

//TOTAL COMPRA
function totalCarrito(){
    let contenedorProducto = document.getElementsByClassName("carr-items")[0]
    let carrRows = contenedorProducto.getElementsByClassName("carr-row")
    let total = 0
    for (let i = 0; i < carrRows.length; i++){
        let carrRow = carrRows[i]
        let precioRow = carrRow.getElementsByClassName("carr-price")[0]
        let cantidadRow = carrRow.getElementsByClassName("carr-cantidad-input")[0]
        let precio = parseFloat(precioRow.innerText.replace(`$`, ` `))
        let cantidad = cantidadRow.value
        total = total + (precio * cantidad)
    } 
    total = Math.round(total * 100) / 100
    document.getElementById("precioTotal")[0] = `$` + total
}
// BTN COMPRAR
document.getElementsByClassName("btn-comprar")[0].addEventListener("click", compro )
function compro() {
    alert("Gracias por su compra!")
    let carrItems = document.getElementsByClassName("carr-items")[0]
    while(carrItems.hasChildNodes()){
        carrItems.removeChild(carrItems.firstChild)
    }
    totalCarrito()
}

