import { validationResult } from "express-validator";
import { producto, categoria, usuario } from "../models/index.js";
import { unlink } from "node:fs/promises";
import { Sequelize } from "sequelize";

//Gestion de Menu
const gestion_menu = async (req, res) => {
  console.log("entro al gestio menu");
  const { _token } = req.cookies;
  const { filtro } = req.query;
  console.log(filtro);
  const [categorias] = await Promise.all([categoria.findAll()]);

  try {
    const { id } = req.usuario;
    if (filtro != null && filtro != 0) {
      console.log("segundo If");
      const [productos] = await Promise.all([
        producto.findAll({
          where: {
            usuarioId: id,
            categoriaId: filtro,
          },
          include: [{ model: categoria, as: "categoria" }],
        }),
      ]);
      res.render("menu/gestionar_menu", {
        pagina: "Gestionar Menu",
        nombre: req.usuario.nombre,
        productos,
        csrfToken: req.csrfToken(),
        user: req.usuario,
        mostrar: true,
        _token,
        categorias,
      });
    } else if (filtro == 0 || filtro == null) {
      console.log("primer If");
      const [productos] = await Promise.all([
        producto.findAll({
          where: {
            usuarioId: id,
          },
          include: [{ model: categoria, as: "categoria" }],
        }),
      ]);
      res.render("menu/gestionar_menu", {
        pagina: "Gestionar Menu",
        nombre: req.usuario.nombre,
        productos,
        csrfToken: req.csrfToken(),

        user: req.usuario,
        mostrar: true,
        _token,
        categorias,
      });
    }
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
    user: req.usuario,
    _token,
  });
};

const menu_guardar = async (req, res) => {
  //Validar
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const { _token } = req.cookies;
    const [categorias] = await Promise.all([categoria.findAll()]);
    return res.render("menu/menu_crear", {
      pagina: "Crear Menu",
      csrfToken: req.csrfToken(),
      categorias,
      errores: resultado.array(),
      datos: req.body,
      user: req.usuario,
      _token,
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
      stock: false,
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
    // user: id,
    user: req.usuario,
    _token,
  });
};

const almacenarImagen = async (req, res, next) => {
  const { id } = req.params;
  const Producto = await producto.findByPk(id);

  try {
    Producto.imagen = req.file.filename;
    Producto.aprobado = 1;
    await Producto.save();
    console.log(Producto.id);
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
    _token,
  });
};

const guardarCambios = async (req, res) => {
  let resultado = validationResult(req);
  const { _token } = req.cookies;

  if (!resultado.isEmpty()) {
    const [categorias] = await Promise.all([categoria.findAll()]);
    return res.render("menu/editar", {
      pagina: "Editar Menu",
      csrfToken: req.csrfToken(),
      categorias,
      errores: resultado.array(),
      datos: req.body,
      _token,
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

const cambiarStock = async (req, res) => {
  const { id } = req.params;
  const Producto = await producto.findByPk(id);
  if (Producto.stock == true) {
    Producto.stock = false;
    await Producto.save();
  } else if (Producto.stock == false) {
    Producto.stock = true;
    await Producto.save();
  }
  res.redirect("/menu/gestionar_menu");
};

const buscador = async (req, res) => {
  const { termino } = req.body;
  const { _token } = req.cookies;
  // Revisar que no este vacio
  if (!termino.trim()) {
    return res.redirect("/menu/gestionar_menu");
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
    pagina: "Resultado de Búsqueda",
    productos,
    _token,
    csrfToken: req.csrfToken(),
    mostrar: true,
    user: req.usuario,
    nombre: req.usuario.nombre,
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
  cambiarStock,
  buscador,
};
