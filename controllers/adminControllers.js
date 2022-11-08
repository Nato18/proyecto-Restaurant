import { usuario } from "../models/index.js";
import { check, validationResult } from "express-validator";
import { Sequelize } from "sequelize";

const gestionarAdmin = async (req, res) => {
  const { _token } = req.cookies;
  try {
    const [administradores] = await Promise.all([
      usuario.findAll({
        where: {
          admin: true,
        },
      }),
      usuario.count({
        where: {
          admin: true,
        },
      }),
    ]);
    res.render("admin/admin-gestionar", {
      nombre: req.usuario.nombre,
      pagina: "Gestionar Admin",
      // user: req.usuario.id,
      user: req.usuario,
      mostrar: true,
      administradores,
      csrfToken: req.csrfToken(),
      _token,
    });
  } catch (error) {
    console.log(error);
  }
};

const formularioAdmin = (req, res) => {
  const { _token } = req.cookies;
  res.render("admin/admin-crear", {
    pagina: "Creando Admin",
    csrfToken: req.csrfToken(),
    _token,
  });
};

const crearAdmin = async (req, res) => {
  await check("nombre")
    .notEmpty()
    .withMessage("El Nombre es obligatorio")
    .run(req);

  await check("email")
    .isEmail()
    .withMessage("El Correo Electronico no es valido")
    .run(req);

  await check("telefono")
    .isLength({ min: 8, max: 8 })
    .withMessage("El Telefono no es Valido")
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
  // Verificar que resultado este vacio
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("admin/admin-crear", {
      pagina: "Creando Admin",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
      admin: {
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
      },
    });
  }

  const { nombre, telefono, email, contrasena } = req.body;

  const existeUsuario = await usuario.findOne({ where: { email } });
  if (existeUsuario) {
    return res.render("admin/admin-crear", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El Email ya esta registrado" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  // Guarda el administrador
  const admin = await usuario.create({
    nombre,
    telefono,
    email,
    contrasena,
    admin: true,
    confirmado:true
  });
  res.redirect("/admin/admin-gestionar");
};

const editarAdmin = async (req, res) => {
  const { _token } = req.cookies;
  const { id } = req.params;
  const Usuario = await usuario.findByPk(id);

  res.render("admin/admin-editar", {
    pagina: "Editar Admin",
    csrfToken: req.csrfToken(),
    admin: Usuario,
    _token,
  });
};

const guardarCambios = async (req, res) => {
  let resultado = validationResult(req);
  const { _token } = req.cookies;

  if (!resultado.isEmpty()) {
    return res.render("admin/admin-editar", {
      pagina: "Editar Admin",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      admin: req.body,
      _token,
    });
  }

  const { id } = req.params;
  const Usuario = await usuario.findByPk(id);
  const { nombre, email, telefono } = req.body;
  try {
    Usuario.set({
      nombre,
      email,
      telefono,
    });
    await Usuario.save();
    res.redirect("/admin/admin-gestionar");
  } catch (error) {
    console.log(error);
  }
};

const eliminarAdmin = async (req, res) => {
  const { id } = req.params;
  const Usuario = await usuario.findByPk(id);

  await Usuario.destroy();
  res.redirect("/admin/admin-gestionar");
};

const buscador = async (req, res) => {
  const { termino } = req.params;
  const { _token } = req.cookies;
  // Revisar que no este vacio
  if (!termino) {
    return res.redirect("back");
  }

  // Consultar los productos
  const administradores = await usuario.findAll({
    where: {
      nombre: {
        [Sequelize.Op.like]: "%" + termino + "%",
      },
      admin: true,
    },
  });

  res.render("admin/admin-buscador", {
    pagina: "Resultado de Busqueda",
    _token,
    csrfToken: req.csrfToken(),
    mostrar: true,
    // user: req.usuario.id,
    user: req.usuario,
    nombre: req.usuario.nombre,
    administradores,
  });
};
export {
  gestionarAdmin,
  formularioAdmin,
  crearAdmin,
  editarAdmin,
  guardarCambios,
  eliminarAdmin,
  buscador,
};
