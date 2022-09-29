let botones = document.querySelectorAll(".agregar");
let productosSelec = [];
for (const boton of botones) {
  boton.addEventListener("click", function agregar() {
    let productoBtn = boton.getAttribute("class");
    productoBtn = productoBtn.split(" ");
    productoBtn = productoBtn[1];
    let tituloProducto = document.querySelector(`.${productoBtn}`).innerHTML;
    productosSelec.push(tituloProducto);
    let cantidad = document.querySelector(".cantidadCarrito");
    cantidad.innerHTML = productosSelec.length;
    let nombre = document.querySelector(".nombreCarrito");
    nombre.innerHTML = productosSelec
    console.log(productosSelec);
  });
}
