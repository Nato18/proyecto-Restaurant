import express from "express";
import {
  verinicio,
  quienesSomos,
  ubicacionContacto,
  categoriaMenu,
} from "../controllers/navegacionControllers.js";
import login from "../middleware/login.js";
const router = express.Router();

// Navegacion en paginas iniciales
router.get("/", verinicio);
router.get("/quienes-somos", quienesSomos);
router.get("/ver-menu/:id", categoriaMenu);
router.get("/ubicacion-contacto", ubicacionContacto);

export default router;
