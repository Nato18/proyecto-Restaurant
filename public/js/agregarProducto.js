/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/agregarProducto.js":
/*!***********************************!*\
  !*** ./src/js/agregarProducto.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nlet botones = document.querySelectorAll(\".agregar\");\r\nlet productosSelec = \"\";\r\nlet total = 0;\r\nfor (const boton of botones) {\r\n  boton.addEventListener(\"click\", function agregar() {\r\n    let productoBtn = boton.getAttribute(\"class\");\r\n    productoBtn = productoBtn.split(\" \");\r\n    productoBtn = productoBtn[1];\r\n    let producto = document.querySelector(`.${productoBtn}`);\r\n    let primerElemento = producto.firstChild.innerHTML;\r\n    primerElemento = primerElemento.substring(0, primerElemento.length - 1);\r\n    productosSelec = productosSelec + primerElemento;\r\n    productosSelec = productosSelec + \",\";\r\n\r\n    //Precio del Producto + la suma del total de Productos\r\n    let ultimoElemento = producto.lastChild.innerHTML;\r\n    ultimoElemento = ultimoElemento.slice(1);\r\n    total = total + Number(ultimoElemento);\r\n    let cantidad = document.querySelector(\".cantidadCarrito\");\r\n    cantidad.innerHTML = \"$\" + total;\r\n\r\n    // Creacion de div para insertar el nombre del producto y se agrega el div\r\n    const productoTotales = document.querySelector(\r\n      \".productosTotalesAgregados\"\r\n    );\r\n    const div = document.createElement(\"div\");\r\n    div.classList.toggle(\"productosAgregados\");\r\n    productoTotales.appendChild(div);\r\n\r\n    //Creacion de \"p\" para insertar el precio del producto\r\n    const precioProducto = document.createElement(\"p\");\r\n    precioProducto.innerHTML = \"$\" + ultimoElemento;\r\n    precioProducto.classList.toggle(\"nombreCarrito\");\r\n    div.appendChild(precioProducto);\r\n\r\n    // Creacion de \"p\" para insertar el nombre del producto\r\n    const nombreProducto = document.createElement(\"p\");\r\n    nombreProducto.innerHTML = primerElemento;\r\n    nombreProducto.classList.toggle(\"nombreCarrito\");\r\n    nombreProducto.classList.toggle(\"titulo\");\r\n    div.appendChild(nombreProducto);\r\n\r\n    //Creacion de Boton\r\n    const btn = document.createElement(\"button\");\r\n    btn.type = \"button\";\r\n    btn.innerText = \"Quitar\";\r\n    btn.classList.toggle(\"btnOpcion\");\r\n\r\n    //Funcion para borrar producto y descontar el dinero del total\r\n    btn.addEventListener(\"click\", (e) => {\r\n      const item = e.target.parentElement;\r\n      console.log(item);\r\n      total = total - Number(ultimoElemento);\r\n      cantidad.innerHTML = \"$\" + total;\r\n      productosSelec = productosSelec.replace(primerElemento+\",\",\"\")\r\n      console.log(productosSelec);\r\n      productoTotales.removeChild(item);\r\n    });\r\n    div.appendChild(btn);\r\n  });\r\n}\r\n// const productos = document.querySelectorAll(\".productosAgregados\");\r\nlet continuar = document.getElementById(\"continuar\");\r\ncontinuar.addEventListener(\"click\", function continuar() {\r\n  let str = productosSelec.substring(0, productosSelec.length - 1);\r\n  document.getElementById(\"productos\").setAttribute(\"value\", str);\r\n  document.getElementById(\"total\").setAttribute(\"value\", total);\r\n});\r\n\r\n\r\n\n\n//# sourceURL=webpack://proyecto_tesis/./src/js/agregarProducto.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/agregarProducto.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;