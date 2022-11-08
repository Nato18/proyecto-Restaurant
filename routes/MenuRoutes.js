import express from "express";
import { body } from "express-validator";
import protegerRutaModerador from "../middleware/protegerRutaModerador.js";
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
  cambiarStock,
  buscador,
} from "../controllers/menuControllers.js";

const router = express.Router();

router.get("/gestionar_menu", protegerRutaModerador, gestion_menu);

router.get("/menu_crear", protegerRutaModerador, menu_crear);
router.post(
  "/menu_crear",
  protegerRutaModerador,
  body("categoria").notEmpty().withMessage("Selecciona una Categoria"),
  body("titulo").notEmpty().withMessage("El Nombre es obligatorio"),
  body("descripcion").notEmpty().withMessage("la Descripcion es obligatorio"),
  body("precio").notEmpty().withMessage("El Precio es obligatorio"),
  menu_guardar
);

router.get("/agregar-imagen/:id", protegerRutaModerador, agregarImagen);
router.post(
  "/agregar-imagen/:id",
  protegerRutaModerador,
  upload.single("imagen"),
  almacenarImagen
);

router.get("/editar/:id", protegerRutaModerador, menuEditar);
router.post(
  "/editar/:id",
  protegerRutaModerador,
  body("categoria").notEmpty().withMessage("Selecciona una Categoria"),
  body("titulo").notEmpty().withMessage("El Nombre es obligatorio"),
  body("descripcion").notEmpty().withMessage("la Descripcion es obligatorio"),
  body("precio").notEmpty().withMessage("El Precio es obligatorio"),
  guardarCambios,
);

router.post("/eliminar/:id", protegerRutaModerador, eliminar);
router.post("/cambiarStock/:id",protegerRutaModerador, cambiarStock)
router.post("/buscador",protegerRutaModerador, buscador);


export default router;
