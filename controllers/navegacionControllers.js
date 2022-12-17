import { producto, categoria, usuario } from "../models/index.js";

const verinicio = (req, res) => {
  const { _token } = req.cookies;
  res.render("pagina/inicio", {
    pagina: "Inicio",
    _token,
  });
};

const quienesSomos = (req, res) => {
  const { _token } = req.cookies;
  res.render("pagina/quienes-somos", {
    pagina: "Quienes Somos",
    _token,
  });
};

const categoriaMenu = async (req, res) => {
  const { id } = req.params;
  const Categoria = await categoria.findByPk(id);
  const { _token } = req.cookies;
  if (!Categoria) {
    return res.redirect("/404");
  }

  // Productos de cada categoria
  const productos = await producto.findAll({
    where: {
      categoriaId: id,
      stock: true,
    },
  });
  res.render("pagina/ver-menu", {
    pagina: "Menú",
    productos,
    Categoria,
    _token,
  });
};

const ubicacionContacto = (req, res) => {
  const { _token } = req.cookies;
  res.render("pagina/ubicacion-contacto", {
    pagina: "Ubicación y Contacto",
    _token,
  });
};

export { verinicio, quienesSomos, categoriaMenu, ubicacionContacto };
