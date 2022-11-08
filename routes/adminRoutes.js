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

router.get("/admin-gestionar", protegerRutaModerador, gestionarAdmin);

router.get("/admin-crear", protegerRutaModerador, formularioAdmin);
router.post("/admin-crear", protegerRutaModerador, crearAdmin);

router.get("/admin-editar/:id", protegerRutaModerador, editarAdmin);
router.post(
  "/admin-editar/:id",
  protegerRutaModerador,
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("telefono").notEmpty().withMessage("El telefono es obligatorio"),
  body("email").notEmpty().withMessage("El email es obligatorio"),
  guardarCambios
);

router.post("/eliminar/:id", protegerRutaModerador, eliminarAdmin);
router.post("/admin-buscador",protegerRutaModerador, buscador)
export default router;
