import { usuario } from "../models/index.js";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
const configurar = (req, res) => {
  const { _token } = req.cookies;
  const usuario = req.usuario;
  res.render("configurar/configurar-cuenta", {
    nombre: usuario.nombre,
    pagina: "Configuracion de cuenta",
    mostrar: true,
    user: usuario,
    usuario,
    _token,
    csrfToken: req.csrfToken(),
  });
};

const guardarCambios = async (req, res) => {
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await check("email")
    .isEmail()
    .withMessage("El Correo Electronico no es valido")
    .run(req);
  await check("telefono")
    .isLength({ min: 8, max: 8 })
    .withMessage("El telefono no es de 8 numeros")
    .run(req);
  let resultado = validationResult(req);

  //Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    const { _token } = req.cookies;
    const usuario = req.usuario;
    //Errores
    return res.render("configurar/configurar-cuenta", {
      nombre: usuario.nombre,
      pagina: "Configuracion de cuenta",
      mostrar: true,
      user: usuario,
      _token,
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
      },
    });
  }

  const { id } = req.usuario;
  const Usuario = await usuario.findByPk(id);
  const { nombre, email, telefono } = req.body;
  try {
    Usuario.nombre = nombre;
    Usuario.telefono = telefono;
    Usuario.email = email;
    await Usuario.save();
    res.redirect("/configurar/");
  } catch (error) {
    console.log(error);
  }
};

const cambiarContraseña = async (req, res) => {
  const { _token } = req.cookies;
  const { id } = req.usuario;
  res.render("configurar/cambiar-password", {
    pagina: "Cambiar Contraseña",
    mostrar: true,
    _token,
    user: req.usuario,
    nombre: req.usuario.nombre,
    csrfToken: req.csrfToken(),
  });
};

const guardarContraseña = async (req, res) => {
  const { id } = req.usuario;
  const Usuario = await usuario.findByPk(id);
  const { passActual, passNueva, passNuevaRepetida } = req.body;
  const comparar = bcrypt.compareSync(passActual, Usuario.contrasena);
  await check("passNueva")
    .isLength({ min: 5 })
    .withMessage("La contraseña debe contener al menos 5 caracteres")
    .run(req);
  await check("passNuevaRepetida")
    .equals(passNueva)
    .withMessage("Las contraseñas no son iguales")
    .run(req);

  let resultado = validationResult(req);

  //Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    const { _token } = req.cookies;
    const { id } = req.usuario;
    return res.render("configurar/cambiar-password", {
      pagina: "Cambiar Contraseña",
      mostrar: true,
      _token,
      user: req.usuario,
      nombre: req.usuario.nombre,
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
      comparar,
    });
  }
  const hash = bcrypt.hashSync(passNueva, 10);
  Usuario.set({
    contrasena:hash,
  });
  await Usuario.save();

  res.redirect("/configurar/");
};

export { configurar, guardarCambios, cambiarContraseña, guardarContraseña };
