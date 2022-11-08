import { DataTypes } from "sequelize";
import db from "../config/db.js";

const reserva = db.define("reserva", {
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  personas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comida: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  reservaComida: DataTypes.TEXT,
  monto: DataTypes.INTEGER,
  codigo: DataTypes.TEXT,
  finalizado: DataTypes.BOOLEAN,
});

export default reserva;
