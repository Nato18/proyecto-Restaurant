import express from "express";
import {
  gestionarMesa,
  verMesas,
  crearReserva,
  guardarReserva,
  editarMesa,
  guardarCambios,
  buscador,
} from "../controllers/mesaControllers.js";
import protegerRutaAdmin from "../middleware/protegerRutaAdmin.js";
const router = express.Router();

router.get("/gestionar-mesa", protegerRutaAdmin, gestionarMesa);
// router.post("/ver-mesas",protegerRutaAdmin, verMesas);
router.get("/ver-mesas", protegerRutaAdmin, verMesas);

router.get("/crear-reserva", protegerRutaAdmin, crearReserva);
router.post("/crear-reserva", protegerRutaAdmin, guardarReserva);

router.get("/editar/:id", protegerRutaAdmin, editarMesa);
router.post("/editar/:id", protegerRutaAdmin, guardarCambios);

router.post("/buscador", protegerRutaAdmin, buscador);

export default router;
