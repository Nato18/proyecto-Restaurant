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
  tipo: DataTypes.TEXT,
  codigo: DataTypes.TEXT,
  finalizado: DataTypes.BOOLEAN,
  Realizado: DataTypes.DATEONLY,
});

export default reserva;
