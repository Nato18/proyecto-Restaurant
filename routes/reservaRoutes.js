import express from "express";
import {
  hacerReserva,
  guardarReserva,
  reservarComida,
  almacenarComida,
  vistaPrevia,
  reservaAceptada,
  reservaCancelada,
  verReserva,
  verMas
} from "../controllers/reservaControllers.js";
import protegerRutaNormal from "../middleware/protegerRutaNormal.js";
const router = express.Router();


router.get("/realizar-reserva", protegerRutaNormal, hacerReserva);
router.post("/realizar-reserva", protegerRutaNormal, guardarReserva);
router.get("/reservar-comida/:id", protegerRutaNormal, reservarComida);
router.post("/reservar-comida/:id", protegerRutaNormal, almacenarComida);
router.get("/vista-previa/:id", protegerRutaNormal, vistaPrevia);
router.get("/reserva-aceptada/:id", protegerRutaNormal, reservaAceptada);
router.get("/reserva-cancelada/:id", protegerRutaNormal, reservaCancelada);
router.get("/ver-reservas", protegerRutaNormal, verReserva);
router.get("/ver-mas/:id", protegerRutaNormal, verMas);

export default router;
  