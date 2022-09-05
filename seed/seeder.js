import categorias from "./categorias.js";
import usuarios from "./usuarios.js";
// import categoria from "../models/categoria.js";
import { categoria, usuario } from "../models/index.js";
import db from "../config/db.js";

const importarDatos = async () => {
  try {
    console.log("aloo");
    // Autenticar
    await db.authenticate();

    //Generar las Columnas
    await db.sync();

    // Insertamos los datos
    await Promise.all([
      categoria.bulkCreate(categorias),
      usuario.bulkCreate(usuarios),
    ]);
    console.log("Datos Importados");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const eliminarDatos = async () => {
  try {
    await db.sync({ force: true });
    console.log("Datos Eliminados");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importarDatos();
}

if (process.argv[2] === "-e") {
  eliminarDatos();
}
