import express from "express";
import { body } from "express-validator";
import {configurar,guardarCambios, cambiarContraseña,guardarContraseña} from "../controllers/confiControllers.js";
import protegerRutaNormal from "../middleware/protegerRutaNormal.js";
const router = express.Router();

router.get("/", protegerRutaNormal,configurar);
router.post("/", protegerRutaNormal,guardarCambios);

router.get("/cambiar-password", protegerRutaNormal, cambiarContraseña)
router.post("/cambiar-password", protegerRutaNormal, guardarContraseña)
export default router;
