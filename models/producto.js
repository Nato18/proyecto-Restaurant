import { DataTypes } from "sequelize";
import db from "../config/db.js";

const producto = db.define("productos", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    allowNull: false,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aprobado:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

export default producto;