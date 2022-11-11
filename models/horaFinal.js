import { DataTypes } from "sequelize";
import db from "../config/db.js";

const horaFinal = db.define("horasfinals", {
  horafinal: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

export default horaFinal;
