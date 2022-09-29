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
import protegerRuta from "../middleware/protegerRuta.js";

const router = express.Router();

router.get("/admin-gestionar", protegerRuta, gestionarAdmin);

router.get("/admin-crear", protegerRuta, formularioAdmin);
router.post("/admin-crear", protegerRuta, crearAdmin);

router.get("/admin-editar/:id", protegerRuta, editarAdmin);
router.post(
  "/admin-editar/:id",
  protegerRuta,
  guardarCambios,
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("telefono").notEmpty().withMessage("El telefono es obligatorio"),
  body("email").notEmpty().withMessage("el email es obligatorio")
);

router.post("/eliminar/:id", protegerRuta, eliminarAdmin);
router.post("/buscador",buscador)
export default router;
