import { reserva, hora, categoria, producto } from "../models/index.js";
import { Sequelize } from "sequelize";
import { check, validationResult } from "express-validator";

const hacerReserva = async (req, res) => {
  const { _token } = req.cookies;
  const [horas] = await Promise.all([hora.findAll()]);

  // Validacion
  // await check("fecha")
  //   .notEmpty()
  //   .withMessage("La fecha es obligatoria")
  //   .run(req);
  // await check("hora").notEmpty().withMessage("La hora es obligatoria").run(req);
  // await check("personas")
  //   .notEmpty()
  //   .withMessage("El numero de personas es obligatoria")
  //   .run(req);
  // let resultado = validationResult(req);
  // if (!resultado.isEmpty()) {
  res.render("reserva/realizar-reserva", {
    pagina: "Reservar",
    horas,
    datos: {},
    csrfToken: req.csrfToken(),
    _token,
    // errores: resultado.array(),
  });
};

const guardarReserva = async (req, res) => {
  const { fecha, hora: horaId, personas, comida } = req.body;
  const { id: usuarioId } = req.usuario;

  try {
    const reservaGuardada = await reserva.create({
      fecha,
      horaId,
      personas,
      comida,
      usuarioId,
      monto: 0,
    });

    const { id } = reservaGuardada;
    if (comida == "si") {
      res.redirect(`/reserva/reservar-comida/${id}`);
    } else {
      res.send("no se Guarda la comida");
    }
  } catch (error) {
    console.log(error);
  }
};

const reservarComida = async (req, res) => {
  // Productos de cada categoria
  const { _token } = req.cookies;
  const productos = await producto.findAll({});
  const { id } = req.params;
  const Reserva = await reserva.findByPk(id);
  res.render("reserva/reservar-comida", {
    pagina: `Reservar Comida`,
    productos,
    csrfToken: req.csrfToken(),
    Reserva,
    _token,
  });
};

const almacenarComida = (req, res) => {
  //Quiero tener este Array aca y guardarlo en la base de datos
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};

export { hacerReserva, guardarReserva, reservarComida, almacenarComida };
