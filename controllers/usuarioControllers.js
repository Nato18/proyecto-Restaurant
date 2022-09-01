import db from "../config/db.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import { generarId, generarJWT } from "../helpers/tokens.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/emails.js";

const formulariologin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesion",
    csrfToken: req.csrfToken(),
  });
};

const autenticar = async (req, res) => {
  console.log("autenticando...");
  // Validacion
  await check("email")
    .isEmail()
    .withMessage("El email es obligatorio")
    .run(req);
  await check("contrasena")
    .notEmpty()
    .withMessage("La contraseña es obligatorio")
    .run(req);
  let resultado = validationResult(req);

  // Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/login", {
      pagina: "Iniciar Sesion",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }

  const { email, contrasena } = req.body;

  // Verificar si el usuario existe
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    return res.render("auth/login", {
      pagina: "Iniciar Sesion",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El Usuario no existe" }],
    });
  }

  // Verificar si el usuario esta confirmado
  if (!usuario.confirmado) {
    return res.render("auth/login", {
      pagina: "Iniciar Sesion",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "La Cuenta no ha sido confirmado" }],
    });
  }

  // Verificar si la contraseña no es correcta
  if (!usuario.verificarContraseña(contrasena)) {
    return res.render("auth/login", {
      pagina: "Iniciar Sesion",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "La Contraseña es incorrecta" }],
    });
  }

  // Verificar Usuario
  const token = generarJWT(usuario.id);
  console.log(token);
  // Guardar en un Cookie
  return res.cookie('_token',token, {
    httpOnly: true,
    // secure: true,
    // sameSite: true

  }).redirect('mis-reservas')
};

const formularioregistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
    csrfToken: req.csrfToken(),
  });
};

const registrar = async (req, res) => {
  // Validacion
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await check("email")
    .isEmail()
    .withMessage("El Correo Electronico no es valido")
    .run(req);
  await check("contrasena")
    .isLength({ min: 5 })
    .withMessage("La contraseña debe contener al menos 5 caracteres")
    .run(req);
  await check("repetir_contrasena")
    .equals(req.body.contrasena)
    .withMessage("Las contraseñas no son iguales")
    .run(req);

  let resultado = validationResult(req);

  //Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  // Datos
  const { nombre, email, contrasena } = req.body;
  // Verificar Usuario Duplicado
  const existeUsuario = await Usuario.findOne({ where: { email } });
  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El Email ya esta registrado" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }
  // Guardar un usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    contrasena,
    token: generarId(),
  });

  // ENVIO DE EMAIL PARA CONFIRMAR
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  // Mensaje de Confirmacion de Email
  res.render("templates/mensaje", {
    pagina: "Cuenta Creada Correctamente",
    mensaje:
      "Te hemos enviado un email de Confirmacion, haz click en el enlace",
  });
};

// Confirmar Cuenta

const confirmar = async (req, res) => {
  const { token } = req.params;

  // Verificar token
  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    return res.render("auth/confirmar", {
      pagina: "Error al confirmar la cuenta",
      mensaje: "Hubo un error al confirmar la cuenta. Intente de nuevo",
      error: true,
    });
  }

  // Confirmar
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();
  res.render("auth/confirmar", {
    pagina: "Cuenta Confirmada",
    mensaje: "La cuenta se confirmó correctamente",
  });
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu Contraseña",
    csrfToken: req.csrfToken(),
  });
};

const resetPassword = async (req, res) => {
  await check("email")
    .isEmail()
    .withMessage("El Correo Electronico no es valido")
    .run(req);
  let resultado = validationResult(req);

  //Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/olvide-password", {
      pagina: "Recupera Tu acceso",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }

  //Buscar usuario
  const { email } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    return res.render("auth/olvide-password", {
      pagina: "Recupera Tu acceso",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El email no pertenece a ningun usuario" }],
    });
  }

  // Generar Token y enviar el email
  usuario.token = generarId();
  await usuario.save();

  //Envio de Email
  emailOlvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token,
  });
  //Mensaje
  res.render("templates/mensaje", {
    pagina: "Reestablece tu Password",
    mensaje: "Hemos enviado un email con los instrucciones",
  });
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    return res.render("auth/confirmar", {
      pagina: "Reestablece tu Contraseña",
      mensaje: "Hubo un error al validar tu informacion, intenta de nuevo",
      error: true,
    });
  }

  //Mostar formulario para cambiar la contraseña
  res.render("auth/reset-password", {
    pagina: "Restablece tu contraseña",
    csrfToken: req.csrfToken(),
  });
};

const nuevoPassword = async (req, res) => {
  // Validar
  await check("contrasena")
    .isLength({ min: 5 })
    .withMessage("La contraseña debe contener al menos 5 caracteres")
    .run(req);
  let resultado = validationResult(req);

  //Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/reset-password", {
      pagina: "Reestablece tu contraseña",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }

  const { token } = req.params;
  const { contrasena } = req.body;

  // Identificar

  const usuario = await Usuario.findOne({ where: { token } });

  // Hashear
  const salt = await bcrypt.genSalt(10);
  usuario.contrasena = await bcrypt.hash(contrasena, salt);
  usuario.token = null;

  await usuario.save();

  res.render("auth/confirmar", {
    pagina: "Contraseña Reestablecida",
    mensaje: "La Contraseña se guardó correctamente",
  });
};

export {
  formulariologin,
  autenticar,
  formularioregistro,
  registrar,
  formularioOlvidePassword,
  confirmar,
  resetPassword,
  comprobarToken,
  nuevoPassword,
};
