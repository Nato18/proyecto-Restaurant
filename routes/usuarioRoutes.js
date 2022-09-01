import express from "express";
import {
  formulariologin,
  autenticar,
  formularioregistro,
  registrar,
  formularioOlvidePassword,
  confirmar,
  resetPassword,
  comprobarToken,
  nuevoPassword,
} from "../controllers/usuarioControllers.js";

const router = express.Router();

// Routing
router.get("/login", formulariologin);
router.post("/login", autenticar);

router.get("/registro", formularioregistro);
router.post("/registro", registrar);

router.get("/confirmar/:token", confirmar);

router.get("/olvide-password", formularioOlvidePassword);
router.post("/olvide-password", resetPassword);

// Guardar nueva contraseña
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);
export default router;
