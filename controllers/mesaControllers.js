import {
  reserva,
  hora,
  estado,
  usuario,
  mesa,
  producto,
  categoria,
  horaFinal,
} from "../models/index.js";
import {
  mesaCancelada,
  mesaConfirmada,
  mesaRechazada,
} from "../helpers/emails.js";
import { check, validationResult } from "express-validator";
const gestionarMesa = async (req, res) => {
  const { _token } = req.cookies;
  const { filtro, fecha: filtroFecha, tipo: filtroTipo } = req.query;

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
      pagina: "Gestionar Clientes",
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
    filtroFecha != null &&
    filtroTipo != null &&
    filtroTipo != 0
  ) {
    const [reservas] = await Promise.all([
      reserva.findAll({
        include: [
          { model: hora, as: "hora" },
          { model: estado, as: "estado" },
        ],
        where: {
          finalizado: true,
          estadoId: filtro,
          fecha: filtroFecha,
          tipo: filtroTipo,
        },
        order: [["id", "DESC"]],
      }),
    ]);
    const [estados] = await Promise.all([estado.findAll()]);
    res.render("mesa/mesa-gestionar", {
      pagina: "Gestionar Clientes",
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
      pagina: "Gestionar Clientes",
      mostrar: true,
      user: req.usuario,
      nombre: req.usuario.nombre,
      reservas,
      _token,
      estados,
      csrfToken: req.csrfToken(),
    });
  } else if (
    (filtro == null && filtroFecha == null && filtroTipo == null) ||
    (filtro == 0 && filtroFecha == 0 && filtroTipo == 0)
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
      pagina: "Gestionar Clientes",
      mostrar: true,
      user: req.usuario,
      nombre: req.usuario.nombre,
      reservas,
      _token,
      estados,
      csrfToken: req.csrfToken(),
    });
  } else if (filtro == 0 && filtroFecha != null && filtroTipo == 0) {
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
      pagina: "Gestionar Clientes",
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
      pagina: "Gestionar Clientes",
      mostrar: true,
      user: req.usuario,
      nombre: req.usuario.nombre,
      reservas,
      _token,
      estados,
      csrfToken: req.csrfToken(),
    });
  } else if (filtroTipo != null) {
    const [reservas] = await Promise.all([
      reserva.findAll({
        include: [
          { model: hora, as: "hora" },
          { model: estado, as: "estado" },
        ],
        where: { finalizado: true, tipo: filtroTipo },
        order: [["id", "DESC"]],
      }),
    ]);
    const [estados] = await Promise.all([estado.findAll()]);
    res.render("mesa/mesa-gestionar", {
      pagina: "Gestionar Clientes",
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
    include: [
      { model: hora, as: "hora" },
      { model: usuario, as: "usuario" },
    ],
  });
  const [estados] = await Promise.all([estado.findAll()]);
  const [mesas] = await Promise.all([mesa.findAll()]);
  const [horasFinal] = await Promise.all([horaFinal.findAll()]);
  // if (Reserva.reservaComida == null) {
  res.render("mesa/editar-mesa", {
    pagina: "Información",
    datos: Reserva,
    estados,
    mesas,
    horasFinal,
    _token,
    csrfToken: req.csrfToken(),
  });
  // } else {
  //   const comidas = Reserva.reservaComida.split(",");
  //   const productos = await producto.findAll({
  //     where: {
  //       titulo: comidas,
  //     },
  //     include: [{ model: categoria, as: "categoria" }],
  //   });
  //   res.render("mesa/editar-mesa", {
  //     pagina: "Información",
  //     datos: Reserva,
  //     estados,
  //     mesas,
  //     _token,
  //     horasFinal,
  //     productos,
  //     comidas,
  //     pedidoComida: true,
  //     csrfToken: req.csrfToken(),
  //   });
  // }
};

const guardarCambios = async (req, res) => {
  await check("estado")
    .notEmpty()
    .withMessage("Selecciona un estado de la mesa")
    .run(req);
  await check("mesa").notEmpty().withMessage("Selecciona una mesa").run(req);

  let resultado = validationResult(req);
  const { estado: estadoId } = req.body;

  if (!resultado.isEmpty()) {
    if (resultado.errors[0].param == "mesa" && estadoId == "2") {
      const { id } = req.params;
      const Reserva = await reserva.findByPk(id, {
        include: [
          { model: usuario, as: "usuario" },
          { model: hora, as: "hora" },
        ],
      });
      Reserva.set({ estadoId, mesaId: null });
      await Reserva.save();
      mesaRechazada({
        nombre: Reserva.usuario.nombre,
        email: Reserva.usuario.email,
        fecha: Reserva.fecha,
        hora: Reserva.hora.hora,
        personas: Reserva.personas,
      });
      // await Reserva.destroy();
      // res.redirect(`/mesa/gestionar-mesa`);
      res.redirect(`/mesa/editar/${id}`);
    } else {
      const { _token } = req.cookies;
      const { id } = req.params;
      const Reserva = await reserva.findByPk(id, {
        include: [
          { model: hora, as: "hora" },
          { model: usuario, as: "usuario" },
        ],
      });
      const [estados] = await Promise.all([estado.findAll()]);
      const [mesas] = await Promise.all([mesa.findAll()]);
      const [horasFinal] = await Promise.all([horaFinal.findAll()]);
      // if (Reserva.reservaComida == null) {
      return res.render("mesa/editar-mesa", {
        pagina: "Reservación",
        datos: Reserva,
        estados,
        mesas,
        horasFinal,
        _token,
        csrfToken: req.csrfToken(),
        errores: resultado.array(),
        user: req.usuario,
      });
    //   } else {
    //     const comidas = Reserva.reservaComida.split(",");
    //     const productos = await producto.findAll({
    //       where: {
    //         titulo: comidas,
    //       },
    //       include: [{ model: categoria, as: "categoria" }],
    //     });
    //     return res.render("mesa/editar-mesa", {
    //       pagina: "Reservación",
    //       datos: Reserva,
    //       estados,
    //       mesas,
    //       _token,
    //       productos,
    //       horasFinal,
    //       comidas,
    //       pedidoComida: true,
    //       csrfToken: req.csrfToken(),
    //       errores: resultado.array(),
    //       user: req.usuario,
    //     });
    //   }
    }
  }
  const { id } = req.params;
  const Reserva = await reserva.findByPk(id, {
    include: [
      { model: usuario, as: "usuario" },
      { model: hora, as: "hora" },
    ],
  });
  const { mesa: mesaId, horaFinal: horaFinalId } = req.body;
  try {
    if (horaFinalId != 0) {
      Reserva.set({ estadoId, mesaId, horaFinalId });
      await Reserva.save();
    } else {
      Reserva.set({ estadoId, mesaId });
      await Reserva.save();
    }
    if (estadoId == 1) {
      mesaConfirmada({
        nombre: Reserva.usuario.nombre,
        email: Reserva.usuario.email,
        fecha: Reserva.fecha,
        hora: Reserva.hora.hora,
        personas: Reserva.personas,
        codigo: Reserva.codigo,
      });
      res.redirect(`/mesa/editar/${id}`);
    }
    if (estadoId == 3) {
      mesaCancelada({
        nombre: Reserva.usuario.nombre,
        email: Reserva.usuario.email,
        fecha: Reserva.fecha,
        hora: Reserva.hora.hora,
        personas: Reserva.personas,
      });
      res.redirect(`/mesa/editar/${id}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const verMesas = async (req, res) => {
  const { _token } = req.cookies;
  const { fecha: fechas, pagina: paginaActual } = req.query;
  const [estados] = await Promise.all([estado.findAll()]);
  const expresion = /^[0-9]$/;
  if (!expresion.test(paginaActual)) {
    return res.redirect(`/mesa/ver-mesas?fecha=${fechas}&pagina=1`);
  }
  if (fechas == "") {
    const horas = await hora.findAll({});
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
      pagina: "Gestionar Clientes",
      mostrar: true,
      user: req.usuario,
      nombre: req.usuario.nombre,
      reservas,
      _token,
      horas,
      estados,
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
      include: [
        { model: hora, as: "hora" },
        { model: horaFinal, as: "horasfinal" },
      ],
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

const crearReserva = async (req, res) => {
  const { _token } = req.cookies;
  const [horas] = await Promise.all([hora.findAll()]);
  const [mesas] = await Promise.all([mesa.findAll()]);

  res.render("mesa/crear-reserva", {
    pagina: "Ingresar Cliente",
    horas,
    mesas,
    datos: {},
    csrfToken: req.csrfToken(),
    _token,
    user: req.usuario,
  });
};
const guardarReserva = async (req, res) => {
  // await check("fecha")
  //   .notEmpty()
  //   .withMessage("La fecha es obligatoria")
  //   .run(req);
  await check("hora").notEmpty().withMessage("La hora es obligatoria").run(req);
  await check("personas")
    .notEmpty()
    .withMessage("El numero de personas es obligatoria")
    .run(req);
  await check("mesa").notEmpty().withMessage("Selecciona una mesa").run(req);
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    const { _token } = req.cookies;
    const [horas] = await Promise.all([hora.findAll()]);
    const [mesas] = await Promise.all([mesa.findAll()]);
    return res.render("mesa/crear-reserva", {
      pagina: "Ingresar Cliente",
      horas,
      mesas,
      datos: {},
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      _token,
      user: req.usuario,
    });
  }
  let today = new Date();
  let year = today.getFullYear();
  let mes = today.getMonth() + 1;
  let dia = today.getDate();
  let fecha = year + "-" + mes + "-" + dia;
  const { hora: horaId, personas, mesa: mesaId } = req.body;
  const reservaGuardada = await reserva.create({
    fecha,
    horaId,
    personas,
    mesaId,
    tipo: "Presencial",
    codigo: "Sin código",
    finalizado: true,
    estadoId: 4,
  });
  reservaGuardada.save();
  res.redirect("/mesa/gestionar-mesa");
};

const buscador = async (req, res) => {
  const { termino } = req.body;
  const { _token } = req.cookies;
  const [estados] = await Promise.all([estado.findAll()]);
  // Revisar que no este vacio
  if (!termino.trim()) {
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
    pagina: "Gestionar Clientes",
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

export {
  gestionarMesa,
  editarMesa,
  guardarCambios,
  verMesas,
  crearReserva,
  guardarReserva,
  buscador,
};
