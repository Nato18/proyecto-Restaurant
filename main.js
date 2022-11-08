// const express = require("express"); //Common js
import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import opcionesRoutes from "./routes/opcionesRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import MenuRoutes from "./routes/MenuRoutes.js";
import navegacionRoutes from "./routes/navegacionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import mesaRoutes from "./routes/mesaRoutes.js";
import confiRoutes from "./routes/confiRoutes.js";
import db from "./config/db.js";
import { cookie } from "express-validator";

// Crear la app
const app = express();

// Habilitar lectura de datos
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.log("Conexión Correcta a la Base de datos ");
} catch (error) {
  console.log(error);
}

// Cookie Parser
app.use(cookieParser());

// Cross site
app.use(csrf({ cookie: true }));

// Habilitar Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Carpeta Publica
app.use(express.static("public"));

// Routing
app.use("/", navegacionRoutes);
app.use("/auth", usuarioRoutes);
app.use("/opciones", opcionesRoutes);
app.use("/reserva", reservaRoutes);
app.use("/menu", MenuRoutes);
app.use("/admin", adminRoutes);
app.use("/mesa", mesaRoutes);
app.use("/configurar", confiRoutes);

//Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
