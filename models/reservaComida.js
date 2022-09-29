import { DataTypes } from "sequelize";
import db from "../config/db.js";

const reservaComida = db.define("reservaComida", {
  reservaUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default reservaComida;