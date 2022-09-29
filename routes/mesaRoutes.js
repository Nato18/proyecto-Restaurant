import express from "express";
import {gestionarMesa} from "../controllers/mesaControllers.js";
import protegerRuta from "../middleware/protegerRuta.js";
const router = express.Router();

router.get("/gestionar-mesa",protegerRuta,gestionarMesa);

export default router;
