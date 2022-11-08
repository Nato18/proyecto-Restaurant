let botones = document.querySelectorAll(".agregar");
let productosSelec = "";
let total = 0;
for (const boton of botones) {
  boton.addEventListener("click", function agregar() {
    let productoBtn = boton.getAttribute("class");
    productoBtn = productoBtn.split(" ");
    productoBtn = productoBtn[1];
    let producto = document.querySelector(`.${productoBtn}`);
    let primerElemento = producto.firstChild.innerHTML;
    primerElemento = primerElemento.substring(0, primerElemento.length - 1);
    productosSelec = productosSelec + primerElemento;
    productosSelec = productosSelec + ",";

    //Precio del Producto + la suma del total de Productos
    let ultimoElemento = producto.lastChild.innerHTML;
    ultimoElemento = ultimoElemento.slice(1);
    total = total + Number(ultimoElemento);
    let cantidad = document.querySelector(".cantidadCarrito");
    cantidad.innerHTML = "$" + total;

    // Creacion de div para insertar el nombre del producto y se agrega el div
    const productoTotales = document.querySelector(
      ".productosTotalesAgregados"
    );
    const div = document.createElement("div");
    div.classList.toggle("productosAgregados");
    productoTotales.appendChild(div);

    //Creacion de "p" para insertar el precio del producto
    const precioProducto = document.createElement("p");
    precioProducto.innerHTML = "$" + ultimoElemento;
    precioProducto.classList.toggle("nombreCarrito");
    div.appendChild(precioProducto);

    // Creacion de "p" para insertar el nombre del producto
    const nombreProducto = document.createElement("p");
    nombreProducto.innerHTML = primerElemento;
    nombreProducto.classList.toggle("nombreCarrito");
    nombreProducto.classList.toggle("titulo");
    div.appendChild(nombreProducto);

    //Creacion de Boton
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerText = "Quitar";
    btn.classList.toggle("btnOpcion");

    //Funcion para borrar producto y descontar el dinero del total
    btn.addEventListener("click", (e) => {
      const item = e.target.parentElement;
      console.log(item);
      total = total - Number(ultimoElemento);
      cantidad.innerHTML = "$" + total;
      productosSelec = productosSelec.replace(primerElemento+",","")
      console.log(productosSelec);
      productoTotales.removeChild(item);
    });
    div.appendChild(btn);
  });
}
// const productos = document.querySelectorAll(".productosAgregados");
let continuar = document.getElementById("continuar");
continuar.addEventListener("click", function continuar() {
  let str = productosSelec.substring(0, productosSelec.length - 1);
  document.getElementById("productos").setAttribute("value", str);
  document.getElementById("total").setAttribute("value", total);
});


