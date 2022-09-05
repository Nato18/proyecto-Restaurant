import express from "express";
import { body } from "express-validator";
import protegerRuta from "../middleware/protegerRuta.js";
import {
  moderador,
  gestion_mesa,
  gestion_menu,
  menu_crear,
  menu_guardar,
  agregarImagen,
} from "../controllers/ModeradorControllers.js";

const router = express.Router();

router.get("/opcion_moderador", protegerRuta, moderador);

router.get("/gestionar_mesa", gestion_mesa);

router.get("/gestionar_menu", gestion_menu);

router.get("/menu_crear", protegerRuta, menu_crear);

router.post(
  "/menu_crear",
  protegerRuta,
  body("categoria").notEmpty().withMessage("Selecciona una Categoria"),
  body("titulo").notEmpty().withMessage("El Nombre es obligatorio"),
  body("descripcion").notEmpty().withMessage("la Descripcion es obligatorio"),
  body("precio").notEmpty().withMessage("El Precio es obligatorio"),
  menu_guardar
);

router.get("/agregar-imagen/:id", agregarImagen);

export default router;
