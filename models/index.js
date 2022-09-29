import producto from "./producto.js";
import categoria from "./categoria.js";
import usuario from "./Usuario.js";
import reserva from "./reserva.js";
import hora from "./hora.js";
import reservaComida from "./reservaComida.js";

producto.belongsTo(categoria, { foreignKey: "categoriaId" });
producto.belongsTo(usuario, { foreignKey: "usuarioId" });
reserva.belongsTo(hora, { foreignKey: "horaId" });
reserva.belongsTo(usuario, { foreignKey: "usuarioId" });
reservaComida.belongsTo(producto, { foreignKey: "productoId" });
reservaComida.belongsTo(usuario, { foreignKey: "usuarioId" });
export { producto, categoria, usuario, reserva, hora, reservaComida };
