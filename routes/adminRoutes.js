import express from "express";
import { body } from "express-validator";
import {
  gestionarAdmin,
  formularioAdmin,
  crearAdmin,
  editarAdmin,
  guardarCambios,
  eliminarAdmin,
  buscador
} from "../controllers/adminControllers.js";
import protegerRutaModerador from "../middleware/protegerRutaModerador.js";

const router = express.Router();

router.get("/personal-gestionar", protegerRutaModerador, gestionarAdmin);

router.get("/personal-crear", protegerRutaModerador, formularioAdmin);
router.post("/personal-crear", protegerRutaModerador, crearAdmin);

router.get("/personal-editar/:id", protegerRutaModerador, editarAdmin);
router.post(
  "/personal-editar/:id",
  protegerRutaModerador,
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("telefono").notEmpty().withMessage("El telefono es obligatorio"),
  body("email").notEmpty().withMessage("El email es obligatorio"),
  guardarCambios
);

router.post("/eliminar/:id", protegerRutaModerador, eliminarAdmin);
router.post("/personal-buscador",protegerRutaModerador, buscador)
export default router;
