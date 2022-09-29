import express from "express";
import {
  hacerReserva,
  guardarReserva,
  reservarComida,
  almacenarComida,
} from "../controllers/reservaControllers.js";
import protegerRuta from "../middleware/protegerRuta.js";
const router = express.Router();


router.get("/realizar-reserva", protegerRuta, hacerReserva);
router.post("/realizar-reserva", protegerRuta, guardarReserva);
router.get("/reservar-comida/:id", protegerRuta, reservarComida);
router.post("/reservar-comida/:id", protegerRuta, almacenarComida);

export default router;
