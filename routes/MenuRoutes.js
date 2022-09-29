import express from "express";
import { body } from "express-validator";
import protegerRuta from "../middleware/protegerRuta.js";
import upload from "../middleware/subirImagen.js";
import {
  gestion_menu,
  menu_crear,
  menu_guardar,
  agregarImagen,
  almacenarImagen,
  menuEditar,
  guardarCambios,
  eliminar,
  buscador,
} from "../controllers/menuControllers.js";

const router = express.Router();

router.get("/gestionar_menu", protegerRuta, gestion_menu);

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

router.get("/agregar-imagen/:id", protegerRuta, agregarImagen);
router.post(
  "/agregar-imagen/:id",
  protegerRuta,
  upload.single("imagen"),
  almacenarImagen
);

router.get("/editar/:id", protegerRuta, menuEditar);
router.post(
  "/editar/:id",
  protegerRuta,
  guardarCambios,
  body("categoria").notEmpty().withMessage("Selecciona una Categoria"),
  body("titulo").notEmpty().withMessage("El Nombre es obligatorio"),
  body("descripcion").notEmpty().withMessage("la Descripcion es obligatorio"),
  body("precio").notEmpty().withMessage("El Precio es obligatorio")
);

router.post("/eliminar/:id", protegerRuta, eliminar);
router.post("/buscador", buscador);

export default router;
