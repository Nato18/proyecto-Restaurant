const moderador = (req, res) => {
  res.render("moderador/opcion_moderador", {
    nombre: "Moderador de Prueba",
  });
};

const gestion_mesa = (req, res) => {
  res.render("moderador/gestionar_mesa", {
    pagina: "Gestionar Mesa",
    nombre: "Moderador de Prueba",
  });
};

// Gestion de Menu
const gestion_menu = (req, res) => {
  res.render("moderador/gestionar_menu", {
    pagina: "Gestionar Menu",
    nombre: "Moderador de Prueba",
  });
};

const menu_crear = (req, res) => {
  res.render("moderador/menu_crear", {
    pagina: "Crear Menu",
  });
};

export { moderador, gestion_mesa, gestion_menu, menu_crear };
