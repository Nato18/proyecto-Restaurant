import producto from "./producto.js";
import categoria from "./categoria.js";
import usuario from "./Usuario.js";

producto.belongsTo(categoria, { foreignKey: "categoriaId" });
producto.belongsTo(usuario, { foreignKey: "usuarioId" });

export { producto, categoria, usuario };
