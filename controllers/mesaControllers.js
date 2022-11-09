import {
  reserva,
  hora,
  estado,
  usuario,
  mesa,
  producto,
  categoria,
} from "../models/index.js";
import { mesaConfirmada, mesaRechazada } from "../helpers/emails.js";
import { check, validationResult } from "express-validator";
const gestionarMesa = async (req, res) => {
  const { _token } = req.cookies;
  const { filtro, fecha: filtroFecha } = req.query;
  const [estados] = await Promise.all([estado.findAll()]);
  if (filtro == 7) {
    const [reservas] = await Promise.all([
      reserva.findAll({
        include: [
          { model: hora, as: "hora" },
          { model: estado, as: "estado" },
        ],
        where: { finalizado: true, estadoId: null },
        order: [["id", "DESC"]],
      }),
    ]);
    const [estados] = await Promise.all([estado.findAll()]);
    res.render("mesa/mesa-gestionar", {
      pagina: "Gestionar Mesas",
      mostrar: true,
      user: req.usuario,
      nombre: req.usuario.nombre,
      reservas,
      _token,
      estados,
      csrfToken: req.csrfToken(),
    });
  } else if (
    filtro != null &&
    filtro != 0 &&
    filtroFecha != 0 &&
    filtroFecha != null
  ) {
    const [reservas] = await Promise.all([
      reserva.findAll({
        include: [
          { model: hora, as: "hora" },
          { model: estado, as: "estado" },
        ],
        where: { finalizado: true, estadoId: filtro, fecha: filtroFecha },
        order: [["id", "DESC"]],
      }),
    ]);
    const [estados] = await Promise.all([estado.findAll()]);
    res.render("mesa/mesa-gestionar", {
      pagina: "Gestionar Mesas",
      mostrar: true,
      user: req.usuario,
      nombre: req.usuario.nombre,
      reservas,
      _token,
      estados,
      csrfToken: req.csrfToken(),
    });
  } else if (filtro != null && filtro != 0) {
    const [reservas] = await Promise.all([
      reserva.findAll({
        include: [
          { model: hora, as: "hora" },
          { model: estado, as: "estado" },
        ],
        where: { finalizado: true, estadoId: filtro },
        order: [["id", "DESC"]],
      }),
    ]);
    const [estados] = await Promise.all([estado.findAll()]);
    res.render("mesa/mesa-gestionar", {
      pagina: "Gestionar Mesas",
      mostrar: true,
      user: req.usuario,
      nombre: req.usuario.nombre,
      reservas,
      _token,
      estados,
      csrfToken: req.csrfToken(),
    });
  } else if (
    (filtro == null && filtroFecha == null) ||
    (filtro == 0 && filtroFecha == 0)
  ) {
    const [reservas] = await Promise.all([
      reserva.findAll({
        include: [
          { model: hora, as: "hora" },
          { model: estado, as: "estado" },
        ],
        where: { finalizado: true },
        order: [["id", "DESC"]],
      }),
    ]);
    res.render("mesa/mesa-gestionar", {
      pagina: "Gestionar Mesas",
      mostrar: true,
      user: req.usuario,
      nombre: req.usuario.nombre,
      reservas,
      _token,
      estados,
      csrfToken: req.csrfToken(),
    });
  } else if (filtro == 0 && filtroFecha != null) {
    const [reservas] = await Promise.all([
      reserva.findAll({
        include: [
          { model: hora, as: "hora" },
          { model: estado, as: "estado" },
        ],
        where: { finalizado: true, fecha: filtroFecha },
        order: [["id", "DESC"]],
      }),
    ]);
    res.render("mesa/mesa-gestionar", {
      pagina: "Gestionar Mesas",
      mostrar: true,
      user: req.usuario,
      nombre: req.usuario.nombre,
      reservas,
      _token,
      estados,
      csrfToken: req.csrfToken(),
    });
  } else if (filtro != null && filtro != 0) {
    const [reservas] = await Promise.all([
      reserva.findAll({
        include: [
          { model: hora, as: "hora" },
          { model: estado, as: "estado" },
        ],
        where: { finalizado: true, estadoId: filtro, fecha: filtroFecha },
        order: [["id", "DESC"]],
      }),
    ]);
    const [estados] = await Promise.all([estado.findAll()]);
    res.render("mesa/mesa-gestionar", {
      pagina: "Gestionar Mesas",
      mostrar: true,
      user: req.usuario,
      nombre: req.usuario.nombre,
      reservas,
      _token,
      estados,
      csrfToken: req.csrfToken(),
    });
  }
};

const editarMesa = async (req, res) => {
  const { _token } = req.cookies;
  const { id } = req.params;
  const Reserva = await reserva.findByPk(id, {
    include: [{ model: hora, as: "hora" }],
  });
  const [estados] = await Promise.all([estado.findAll()]);
  const [mesas] = await Promise.all([mesa.findAll()]);
  if (Reserva.reservaComida == null) {
    res.render("mesa/editar-mesa", {
      pagina: "Reservacion",
      datos: Reserva,
      estados,
      mesas,
      _token,
      csrfToken: req.csrfToken(),
    });
  } else {
    const comidas = Reserva.reservaComida.split(",");
    const productos = await producto.findAll({
      where: {
        titulo: comidas,
      },
      include: [{ model: categoria, as: "categoria" }],
    });
    res.render("mesa/editar-mesa", {
      pagina: "Reservacion",
      datos: Reserva,
      estados,
      mesas,
      _token,
      productos,
      comidas,
      pedidoComida: true,
      csrfToken: req.csrfToken(),
    });
  }
};

const guardarCambios = async (req, res) => {
  await check("estado")
    .notEmpty()
    .withMessage("Selecciona un estado de la mesa")
    .run(req);
  await check("mesa").notEmpty().withMessage("Selecciona una mesa").run(req);

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const { _token } = req.cookies;
    const { id } = req.params;
    const Reserva = await reserva.findByPk(id, {
      include: [{ model: hora, as: "hora" }],
    });
    const [estados] = await Promise.all([estado.findAll()]);
    const [mesas] = await Promise.all([mesa.findAll()]);
    if (Reserva.reservaComida == null) {
      return res.render("mesa/editar-mesa", {
        pagina: "Reservacion",
        datos: Reserva,
        estados,
        mesas,
        _token,
        csrfToken: req.csrfToken(),
        errores: resultado.array(),
        user: req.usuario,
      });
    } else {
      const comidas = Reserva.reservaComida.split(",");
      const productos = await producto.findAll({
        where: {
          titulo: comidas,
        },
        include: [{ model: categoria, as: "categoria" }],
      });
      return res.render("mesa/editar-mesa", {
        pagina: "Reservacion",
        datos: Reserva,
        estados,
        mesas,
        _token,
        productos,
        comidas,
        pedidoComida: true,
        csrfToken: req.csrfToken(),
        errores: resultado.array(),
        user: req.usuario,
      });
    }
  }
  const { id } = req.params;
  const Reserva = await reserva.findByPk(id, {
    include: [{ model: usuario, as: "usuario" }],
  });
  const { estado: estadoId, mesa: mesaId } = req.body;
  try {
    Reserva.set({ estadoId, mesaId });
    await Reserva.save();
    if (estadoId == 1) {
      mesaConfirmada({
        nombre: Reserva.usuario.nombre,
        email: Reserva.usuario.email,
      });
      res.redirect(`/mesa/editar/${id}`);
    } else if (estadoId == 2) {
      mesaRechazada({
        nombre: Reserva.usuario.nombre,
        email: Reserva.usuario.email,
      });
      await Reserva.destroy();
      res.redirect("/mesa/gestionar-mesa");
    }
  } catch (error) {
    console.log(error);
  }
};

const verMesas = async (req, res) => {
  const { _token } = req.cookies;
  console.log(req.query);
  const { fecha: fechas, pagina: paginaActual } = req.query;
  const expresion = /^[0-9]$/;
  if (!expresion.test(paginaActual)) {
    return res.redirect(`/mesa/ver-mesas?fecha=${fechas}&pagina=1`);
  }
  if (fechas == "") {
    const { _token } = req.cookies;
    const [reservas] = await Promise.all([
      reserva.findAll({
        include: [
          { model: hora, as: "hora" },
          { model: estado, as: "estado" },
        ],
        where: { finalizado: true },
      }),
    ]);
    return res.render("mesa/mesa-gestionar", {
      pagina: "Gestionar Mesas",
      mostrar: true,
      user: req.usuario,
      nombre: req.usuario.nombre,
      reservas,
      _token,
      csrfToken: req.csrfToken(),
      errores: [{ msg: "Ingresa Una fecha" }],
    });
  } else {
    const limit = 12;
    const offset = paginaActual * limit - limit;

    const [mesas, total] = await Promise.all([
      mesa.findAll({ limit, offset }),
      mesa.count(),
    ]);
    const reservas = await reserva.findAll({
      where: {
        fecha: fechas,
      },
      order: [["horaId", "ASC"]],
      include: [{ model: hora, as: "hora" }],
    });
    const [horas] = await Promise.all([hora.findAll()]);
    res.render("mesa/ver-mesas", {
      pagina: "Estado de Mesas",
      _token,
      reservas,
      horas,
      mesas,
      fechas,
      csrfToken: req.csrfToken(),
      paginas: Math.ceil(total / limit),
      paginaActual,
      limit,
      offset,
      total,
    });
  }
};
const buscador = async (req, res) => {
  const { termino } = req.body;
  const { _token } = req.cookies;
  const [estados] = await Promise.all([estado.findAll()]);
  // Revisar que no este vacio
  if (!termino.trim()) {
    console.log("vacio");
    return res.redirect("/mesa/gestionar-mesa");
  }

  // Consultar los productos
  const reservas = await reserva.findAll({
    where: {
      codigo: termino,
      finalizado: true,
    },
    include: [
      { model: hora, as: "hora" },
      { model: estado, as: "estado" },
    ],
  });

  res.render("mesa/buscador", {
    pagina: "Resultado de Busqueda",
    reservas,
    _token,
    csrfToken: req.csrfToken(),
    mostrar: true,
    // user: req.usuario.id,
    nombre: req.usuario.nombre,
    estados,
    user: req.usuario,
  });
};

export { gestionarMesa, editarMesa, guardarCambios, verMesas, buscador };
