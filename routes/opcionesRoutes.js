import express from "express";
import { producto, categoria, usuario } from "../models/index.js";
import protegerRuta from "../middleware/protegerRuta.js";
const router = express.Router();
router.get("/opciones-usuario/", protegerRuta, (req, res) => {
    const { _token } = req.cookies;
    const {id} = req.usuario;

    res.render("layout/opciones_usuario",{
        pagina: "Opciones",
        nombre: req.usuario.nombre,
        user : id,
        mostrar : true,
        _token
    })

})

export default router;