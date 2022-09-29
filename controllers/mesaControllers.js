import { reserva, hora } from "../models/index.js";

const gestionarMesa = async (req, res) => {
  const { _token } = req.cookies;
  
  const { id } = req.usuario;
  const [reservas] = await Promise.all([
    reserva.findAll({
      include: [{ model: hora, as: "hora" }],
    }),
  ]);
  res.render("mesa/mesa-gestionar", {
    pagina: "Gestionar Mesas",
    mostrar: true,
    user: id,
    nombre: req.usuario.nombre,
    reservas,
    _token
  });
};

export { gestionarMesa };
