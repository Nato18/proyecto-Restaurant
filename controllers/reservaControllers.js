import { reserva, hora, categoria, producto, estado } from "../models/index.js";
import { DATE, Sequelize } from "sequelize";
import { check, validationResult } from "express-validator";

const hacerReserva = async (req, res) => {
  const { _token } = req.cookies;
  const [horas] = await Promise.all([hora.findAll()]);
  res.render("reserva/realizar-reserva", {
    pagina: "Reservar",
    horas,
    datos: {},
    csrfToken: req.csrfToken(),
    _token,
  });
};

const guardarReserva = async (req, res) => {
  // Validacion
  await check("fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .run(req);
  await check("hora").notEmpty().withMessage("La hora es obligatoria").run(req);
  await check("personas")
    .notEmpty()
    .withMessage("El numero de personas es obligatoria")
    .run(req);
  await check("comida")
    .notEmpty()
    .withMessage("Selecciona una opcion para la reserva de comida")
    .run(req);
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    const { _token } = req.cookies;
    const [horas] = await Promise.all([hora.findAll()]);
    console.log(resultado.array());
    return res.render("reserva/realizar-reserva", {
      pagina: "Reservar",
      horas,
      datos: req.body,
      csrfToken: req.csrfToken(),
      _token,
      errores: resultado.array(),
    });
  }

  const { fecha, hora: horaId, personas, comida } = req.body;
  const { id: usuarioId } = req.usuario;
  //Fecha
  let today = new Date();
  let year = today.getFullYear();
  let mes = today.getMonth() + 1;
  let dia = today.getDate();
  let Fecha = year + "-" + mes + "-" + dia;
  console.log(fecha);
  const letrasyNumeros = "abcdefghijklmnopqrstuvwxyz0123456789";
  let generarCodigo = "";
  for (let i = 0; i < 5; i++) {
    generarCodigo += letrasyNumeros.charAt(
      Math.floor(Math.random() * letrasyNumeros.length)
    );
  }
  try {
    const reservaGuardada = await reserva.create({
      fecha,
      horaId,
      personas,
      comida,
      usuarioId,
      monto: 0,
      codigo: generarCodigo,
      reservacionRealizada: Fecha,
    });

    const { id } = reservaGuardada;
    if (comida == "si") {
      res.redirect(`/reserva/reservar-comida/${id}`);
    } else {
      res.redirect(`/reserva/vista-previa/${id}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const reservarComida = async (req, res) => {
  // Productos de cada categoria
  const productos = await producto.findAll({
    where: {
      stock: true,
    },
  });
  const { id } = req.params;
  const { _token } = req.cookies;
  const Reserva = await reserva.findByPk(id);
  res.render("reserva/reservar-comida", {
    pagina: `Reservar Comida`,
    productos,
    csrfToken: req.csrfToken(),
    Reserva,
    _token,
  });
};

const almacenarComida = async (req, res) => {
  //Quiero tener este Array aca y guardarlo en la base de datos
  const { id } = req.params;
  const Reserva = await reserva.findByPk(id);
  try {
    const { ProductosSelec: reservaComida, totalProductos: monto } = req.body;
    Reserva.set({ reservaComida, monto });
    await Reserva.save();
    res.redirect(`/reserva/vista-previa/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const vistaPrevia = async (req, res) => {
  const { id } = req.params;
  const { _token } = req.cookies;
  const Reserva = await reserva.findByPk(id, {
    include: [{ model: hora, as: "hora" }],
  });

  if (Reserva.reservaComida == null) {
    res.render("reserva/vista-previa", {
      pagina: "Vista Previa de Reservacion",
      datos: Reserva,
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

    res.render("reserva/vista-previa", {
      pagina: "Vista Previa de Reservacion",
      datos: Reserva,
      _token,
      productos,
      comidas,
      pedidoComida: true,
      csrfToken: req.csrfToken(),
    });
  }
};
const reservaAceptada = async (req, res) => {
  const { id } = req.params;
  const { _token } = req.cookies;
  const Reserva = await reserva.findByPk(id);
  Reserva.set({ finalizado: true });
  await Reserva.save();
  res.render("reserva/reserva-aceptada", {
    pagina: "Reservacion Aceptada",
    _token,
  });
};

const reservaCancelada = async (req, res) => {
  const { id } = req.params;
  const { _token } = req.cookies;
  try {
    const Reserva = await reserva.findByPk(id);
    await Reserva.destroy();
    res.render("reserva/reserva-cancelada", {
      pagina: "Reservacion Cancelada",
      _token,
    });
  } catch (error) {
    res.redirect("/");
  }
};

const verReserva = async (req, res) => {
  const { _token } = req.cookies;
  const { id } = req.usuario;
  const [reservas] = await Promise.all([
    reserva.findAll({
      include: [
        { model: hora, as: "hora" },
        { model: estado, as: "estado" },
      ],
      where: { finalizado: true, usuarioId: id },
      order: [["id", "DESC"]],
    }),
  ]);
  res.render("reserva/ver-reservas", {
    pagina: "Reservaciones Realizadas",
    _token,
    reservas,
    user: req.usuario,
    nombre: req.usuario.nombre,
    mostrar: true,
  });
};

const verMas = async (req, res) => {
  const { id } = req.params;
  const { _token } = req.cookies;
  const Reserva = await reserva.findByPk(id, {
    include: [
      { model: hora, as: "hora" },
      { model: estado, as: "estado" },
    ],
  });

  if (Reserva.reservaComida == null) {
    res.render("reserva/ver-mas", {
      pagina: "Vista Previa de Reservacion",
      datos: Reserva,
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

    res.render("reserva/ver-mas", {
      pagina: "Vista Previa de Reservacion",
      datos: Reserva,
      _token,
      productos,
      comidas,
      pedidoComida: true,
      csrfToken: req.csrfToken(),
    });
  }
};

export {
  hacerReserva,
  guardarReserva,
  reservarComida,
  almacenarComida,
  vistaPrevia,
  reservaAceptada,
  reservaCancelada,
  verReserva,
  verMas,
};
