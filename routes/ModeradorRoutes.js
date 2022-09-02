import express from "express";
import {
  moderador,
  gestion_mesa,
  gestion_menu,
  menu_crear,
} from "../controllers/ModeradorControllers.js";

const router = express.Router();

router.get("/opcion_moderador", moderador);

router.get("/gestionar_mesa", gestion_mesa);

router.get("/gestionar_menu", gestion_menu);
router.get("/menu_crear", menu_crear);
export default router;
