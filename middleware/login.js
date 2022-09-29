import jwt from "jsonwebtoken";
import { usuario } from "../models/index.js";

const login = async (req, res, next) => {
  //Verificar si hay token

  const { _token } = req.cookies;

  //Comprobar el token
  try {
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);
    const Usuario = await usuario
      .scope("eliminarContraseña")
      .findByPk(decoded.id);

    // Almacenar usuario en req
    if (Usuario) {
      req.usuario = Usuario;
      
    }
  } catch (error) {

  }
  return next();
};
export default login;