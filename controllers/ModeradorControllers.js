import { validationResult } from "express-validator";
import { producto, categoria, usuario } from "../models/index.js";
const moderador = (req, res) => {
  res.render("moderador/opcion_moderador", {
    nombre: "Moderador de Prueba",
  });
};

const gestion_mesa = (req, res) => {
  res.render("moderador/gestionar_mesa", {
    pagina: "Gestionar Mesa",
    nombre: "Moderador de Prueba",
  });
};

// Gestion de Menu
const gestion_menu = (req, res) => {
  console.log("COSAS DEL USUARIO: ", req.usuario);
  res.render("moderador/gestionar_menu", {
    pagina: "Gestionar Menu",
    nombre: "Moderador de Prueba",
  });
};

const menu_crear = async (req, res) => {
  // const [categoria] = await Promise([categoria.findAll()]);
  const [categorias] = await Promise.all([categoria.findAll()]);

  res.render("moderador/menu_crear", {
    pagina: "Crear Menu",
    csrfToken: req.csrfToken(),
    categorias,
    datos: {},
  });
};

const menu_guardar = async (req, res) => {
  //Validar
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const [categorias] = await Promise.all([categoria.findAll()]);
    return res.render("moderador/menu_crear", {
      pagina: "Crear Menu",
      csrfToken: req.csrfToken(),
      categorias,
      errores: resultado.array(),
      datos: req.body,
    });
  }

  // Crear Registro
  const { titulo, descripcion, precio, categoria: categoriaId } = req.body;

  const { id: usuarioId } = req.usuario;

  try {
    const productoGuardado = await producto.create({
      titulo,
      descripcion,
      precio,
      categoriaId,
      usuarioId,
      imagen: "",
    });

    const { id } = productoGuardado;
    res.redirect(`/moderador/agregar-imagen/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const agregarImagen = async (req, res) => {
  res.render("/moderador/agregar-imagen")
};

export {
  moderador,
  gestion_mesa,
  gestion_menu,
  menu_crear,
  menu_guardar,
  agregarImagen,
};
