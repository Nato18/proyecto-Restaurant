import { DataTypes } from "sequelize";
import db from "../config/db.js";

const estado = db.define("estados", {
  estado: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

export default estado;