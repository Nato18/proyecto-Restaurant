import { DataTypes } from "sequelize";
import db from "../config/db.js";

const hora = db.define("horas", {
  hora: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

export default hora;
