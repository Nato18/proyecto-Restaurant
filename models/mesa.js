import { DataTypes } from "sequelize";
import db from "../config/db.js";

const mesa = db.define("mesas", {
  numero: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

export default mesa;
