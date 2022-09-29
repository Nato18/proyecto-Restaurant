import { validationResult } from "express-validator";
import { producto, categoria, usuario } from "../models/index.js";
import { unlink } from "node:fs/promises";
import { Sequelize } from "sequelize";


//Gestion de Menu
const gestion_menu = async (req, res) => {
  const { _token } = req.cookies;
  const { pagina: paginaActual } = req.query;

  const expresion = /^[0-9]$/;

  if (!expresion.test(paginaActual)) {
    return res.redirect("/menu/gestionar_menu?pagina=1");
  }

  try {
    const { id } = req.usuario;

    // Limites
    const limit = 3;
    const offset = paginaActual * limit - limit;

    const [productos, total] = await Promise.all([
      producto.findAll({
        limit,
        offset,
        where: {
          usuarioId: id,
        },
        include: [{ model: categoria, as: "categoria" }],
      }),
      producto.count({
        where: {
          usuarioId: id,
        },
      }),
    ]);
    console.log("id del usuario: ", id);
    res.render("menu/gestionar_menu", {
      pagina: "Gestionar Menu",
      nombre: req.usuario.nombre,
      productos,
      csrfToken: req.csrfToken(),
      paginas: Math.ceil(total / limit),
      paginaActual,
      limit,
      offset,
      total,
      user: id,
      mostrar: true,
      _token
    });
  } catch (error) {
    console.log(error);
  }
};

const menu_crear = async (req, res) => {
  const { _token } = req.cookies;
  const [categorias] = await Promise.all([categoria.findAll()]);
  const { id } = req.usuario;

  res.render("menu/menu_crear", {
    pagina: "Crear Menu",
    csrfToken: req.csrfToken(),
    categorias,
    datos: {},
    user: id,
    _token
  });
};

const menu_guardar = async (req, res) => {
  //Validar
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const [categorias] = await Promise.all([categoria.findAll()]);
    return res.render("menu/menu_crear", {
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
    res.redirect(`/menu/agregar-imagen/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const agregarImagen = async (req, res) => {
  const { _token } = req.cookies;
  const { id } = req.params;
  const Producto = await producto.findByPk(id);
  res.render("menu/agregar-imagen", {
    pagina: `Agregar Imagen: ${Producto.titulo}`,
    csrfToken: req.csrfToken(),
    Producto,
    user:id,
    _token
  });
};

const almacenarImagen = async (req, res, next) => {
  const { id } = req.params;
  const Producto = await producto.findByPk(id);

  try {
    Producto.imagen = req.file.filename;
    Producto.aprobado = 1;

    await Producto.save();
    next();
  } catch (error) {
    console.log(error);
  }
};

const menuEditar = async (req, res) => {
  const { _token } = req.cookies;
  const { id } = req.params;
  const Producto = await producto.findByPk(id);

  const [categorias] = await Promise.all([categoria.findAll()]);
  res.render("menu/editar", {
    pagina: "Editar Menu",
    csrfToken: req.csrfToken(),
    categorias,
    datos: Producto,
    _token
  });
};

const guardarCambios = async (req, res) => {
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const [categorias] = await Promise.all([categoria.findAll()]);
    return res.render("menu/editar", {
      pagina: "Editar Menu",
      csrfToken: req.csrfToken(),
      categorias,
      errores: resultado.array(),
      datos: req.body,
    });
  }

  const { id } = req.params;
  const Producto = await producto.findByPk(id);
  const { titulo, descripcion, precio, categoria: categoriaId } = req.body;
  try {
    Producto.set({
      titulo,
      descripcion,
      precio,
      categoriaId,
    });

    await Producto.save();
    res.redirect("/menu/gestionar_menu");
  } catch (error) {
    console.log(error);
  }
};

const eliminar = async (req, res) => {
  const { id } = req.params;
  const Producto = await producto.findByPk(id);

  //Eliminar la Imagen
  await unlink(`public/uploads/${Producto.imagen}`);

  //Eliminar Producto de la Base de Datos
  await Producto.destroy();
  res.redirect("/menu/gestionar_menu");
};

const buscador = async (req, res) => {
  const { termino } = req.body;

  // Revisar que no este vacio
  if (!termino.trim()) {
    return res.redirect("back");
  }

  // Consultar los productos
  const productos = await producto.findAll({
    where: {
      titulo: {
        [Sequelize.Op.like]: "%" + termino + "%",
      },
    },
    include: [{ model: categoria, as: "categoria" }],
  });

  res.render("menu/buscador", {
    Pagina: "Resultado de Busqueda",
    productos,
    csrfToken: req.csrfToken(),
  });
};

export {
  gestion_menu,
  menu_crear,
  menu_guardar,
  agregarImagen,
  almacenarImagen,
  menuEditar,
  guardarCambios,
  eliminar,
  buscador,
};
