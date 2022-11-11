import producto from "./producto.js";
import categoria from "./categoria.js";
import usuario from "./Usuario.js";
import reserva from "./reserva.js";
import hora from "./hora.js";
import estado from "./estado.js";
import mesa from "./mesa.js";
import horaFinal from "./horaFinal.js";

producto.belongsTo(categoria, { foreignKey: "categoriaId" });
producto.belongsTo(usuario, { foreignKey: "usuarioId" });
reserva.belongsTo(hora, { foreignKey: "horaId" });
reserva.belongsTo(horaFinal, { foreignKey: "horaFinalId" });
reserva.belongsTo(estado, { foreignKey: "estadoId" });
reserva.belongsTo(usuario, { foreignKey: "usuarioId" });
reserva.belongsTo(mesa, { foreignKey: "mesaId" });
export { producto, categoria, usuario, reserva, hora, horaFinal, estado, mesa };
