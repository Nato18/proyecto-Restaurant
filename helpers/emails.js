import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  // Enviar el email
  await transport.sendMail({
    from: "Restaurante.com",
    to: email,
    subject: "Confirmacion de Correo para Restaurante",
    html: `
          <p>Hola ${nombre}, comprueba tu cuenta en restaurante.com</p>
          <p>Tu cuenta ya esta lista, solo falta confirmar en el siguiente enlace:
          <a href="${process.env.CONFIRM_URL}:${
      process.env.PORT ?? 3000
    }/auth/confirmar/${token}">Confirmar Cuenta</a> </p>
          <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>`,
  });
};

const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  // Enviar el email
  await transport.sendMail({
    from: "Restaurante.com",
    to: email,
    subject: "Reestablece tu Password en Restaurante.com",
    text: "Reestablece tu Password en Restaurante.com",
    html: `
          <p>Hola ${nombre}, has solicitado reestablecer tu password en restaurante.com</p>
            <p>Sigue el siguiente enlace para generar un password nuevo:
          <a href="${process.env.CONFIRM_URL}:${
      process.env.PORT ?? 3000
    }/auth/olvide-password/${token}">Restablecer Password</a> </p>
          <p>Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p>`,
  });
};
export { emailRegistro, emailOlvidePassword };
