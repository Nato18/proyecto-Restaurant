import jwt from "jsonwebtoken";
import { usuario } from "../models/index.js";

const protegerRuta = async (req, res, next) => {
  console.log("desde el Middleware");

  //Verificar si hay token
  const { _token } = req.cookies;
  if (!_token) {
    return res.redirect("/auth/login");
  }

  //Comprobar el token
  try {
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);
    const Usuario = await usuario
      .scope("eliminarContraseña")
      .findByPk(decoded.id);

    // Almacenar usuario en req
    if (Usuario) {
      req.usuario = Usuario;
      console.log("usuario: ", req.usuario.id);
    } else {
      return res.redirect("/auth/login");
    }
  } catch (error) {
    return res.clearCookie("_token").redirect("/auth/login");
  }
  return next();
};
export default protegerRuta;
