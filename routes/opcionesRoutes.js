import express from "express";
import { producto, categoria, usuario } from "../models/index.js";
import protegerRutaNormal from "../middleware/protegerRutaNormal.js";
const router = express.Router();
router.get("/opciones-usuario/", protegerRutaNormal, (req, res) => {
    const { _token } = req.cookies;
    const {id} = req.usuario;

    res.render("layout/opciones_usuario",{
        pagina: "Opciones",
        nombre: req.usuario.nombre,
        user : req.usuario,
        mostrar : true,
        _token
    })

})

export default router;