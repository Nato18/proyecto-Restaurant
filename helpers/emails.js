import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
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
    subject: "Confirmación de Cuenta para Restaurante",
    html: `
          <div style="background: #845e02;padding:4px;">
            <div style="padding: 10px 15px;background: white;font-size: 17px;">
              <div style="border-bottom: 1px black solid;margin-bottom: 5px;padding-bottom: 5px;">
                <p style="margin-left:10px;font-weight:700;margin:0;">Restaurante</p>
              </div>
              <div style="margin: 10px 0;">
                <p style="margin:0;">Hola ${nombre}.</p>
                <p style="margin:0;">Tu cuenta ya esta lista, solo falta confirmar en el siguiente enlace:
                <a href="${process.env.CONFIRM_URL}/auth/confirmar/${token}">Confirmar Cuenta</a> </p>
                <p style="margin:0;">Si tu no creaste esta cuenta, puedes ignorar el correo.</p>
              </div>
              <div style="border-top: 1px black solid;padding-top: 5px;margin-left:5px;">
                <p style="font-weight:700;margin:0;"> Contacto</p>
                <p style="margin-left:10px;margin:0;"><span  style="font-weight:700;">Teléfono:</span> +56 912345678</p>
                <p style="margin-left:10px;margin:0;"><span  style="font-weight:700;">Correo Electrónico: </span> restauranttesis@gmail.com</p>
              </div>
            </div>
          </div>
          `,
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
    subject: "Restablece tu Password en Restaurante.com",
    text: "Restablece tu Password en Restaurante.com",
    html: `
        </style>
        <div style="background: #845e02;padding:4px;">
          <div style="padding: 10px 15px;background: white;font-size: 17px;">
            <div style="border-bottom: 1px black solid;margin-bottom: 5px;padding-bottom: 5px;">
              <p style="margin-left:10px;font-weight:700;">Restaurante</p>
            </div>
            <div style="margin: 10px 0;">
              <p style="margin:0;">Hola ${nombre}.</p>
              <p style="margin:0;">Has solicitado restablecer tu contraseña en restaurante.com</p>
              <p style="margin:0;">Sigue el siguiente enlace para generar una contraseña nueva:
              <a href="${process.env.CONFIRM_URL}/auth/olvide-password/${token}">Restablecer Contraseña</a></p>
              <p style="margin:0;">Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p>
            </div>
            <div style="border-top: 1px black solid;padding-top: 5px; margin-left:5px;">
            <p style="font-weight:700;margin:0;"> Contacto</p>
            <p style="margin-left:10px;margin:0;"><span  style="font-weight:700;">Teléfono:</span> +56 912345678</p>
            <p style="margin-left:10px;margin:0;"><span  style="font-weight:700;">Correo Electrónico: </span> restauranttesis@gmail.com</p>
            </div>
          </div>
        </div>
          `,
  });
};

const mesaConfirmada = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, fecha, hora, personas, codigo: código } = datos;
  await transport.sendMail({
    from: "Restaurante.com",
    to: email,
    subject: "Reservación Confirmada en Restaurante.com",
    text: "Reservación Confirmada en Restaurante.com",
    html: `
          <div style="background:#845e02; padding:4px;">
            <div style="padding: 10px 15px;background: white;font-size: 17px;">
              <div style="border-bottom: 1px black solid;margin-bottom: 5px;padding-bottom: 5px;">
                <p style="margin-left:10px;font-weight:700; margin:0;">Restaurante</p>
              </div>
              <div style="margin: 10px 0;">
                <p style="margin:0;">Hola ${nombre}.</p>
                <p style="margin:0;">La reservación que has realizado a sido <span style="font-weight:700;">CONFIRMADA</span>.</p>
                <p style="margin:0;">Presenta el siguiente código en la entrada para hacer el ingreso.</p>
                <p style="margin:0;">En el caso de haber pasado 20 minutos y aun no ha sido confirmado el ingreso, la reservación sera cancelada.</p>
              </div>
              <div style="margin-bottom: 10px;">
                <p style="text-align:center;font-weight:700;margin-bottom:5px;margin:0;">Código</p>
                <p style="text-align:center;text-transform: Uppercase;margin:0;">${código}</p>
              </div style=>
              <div style="margin-bottom:20px;">
                <p style="text-align:center;font-weight:700;margin-bottom:5px;margin:0;">Vista previa de la Reservación</p>
                <p style="text-align:center;"><span style="font-weight:700;margin:0;">Fecha:</span> ${fecha}       <span style="font-weight:700; margin-left: 15px;">Hora:</span> ${hora}     <span style="font-weight:700;margin-left: 15px;">Personas:</span> ${personas}</p>
              </div>
              <div  style="border-top: 1px black solid;padding-top: 5px;margin-left:5px;">
                <p  style="font-weight:700;margin:0;"> Contacto</p>
                <p  style="margin-left:10px;margin:0;"><span style="font-weight:700;">Teléfono:</span> +56 912345678</p>
                <p style="margin-left:10px;margin:0;"><span  style="font-weight:700;">Correo Electrónico: </span> restauranttesis@gmail.com</p>
              </div>
            </div>
          </div>
          `,
  });
};

const mesaRechazada = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, fecha, hora, personas } = datos;
  await transport.sendMail({
    from: "Restaurante.com",
    to: email,
    subject: "Reservación Rechazada en Restaurante.com",
    text: "Reservación Rechazada en Restaurante.com",
    html: `
        <div style="background: #845e02;padding:4px;">
            <div style="padding: 10px 15px;background: white;font-size: 17px;">
              <div style="border-bottom: 1px black solid;margin-bottom: 5px;padding-bottom: 5px;">
                <p style="margin-left:10px;font-weight:700;margin:0;">Restaurante</p>
              </div>
              <div style="margin: 10px 0;">
                <p style="margin: 0;">Hola ${nombre}.</p>
                <p style="margin: 0;">Lo sentimos, la reservación que has realizado a sido <span style="font-weight:700;">RECHAZADA</span> .</p>
                <p style="margin: 0;">Debido a que no se encuentran mesas disponibles para la hora seleccionada. Intente otra vez o contacte con el restaurante.</p>
                <p style="margin: 0;">Responderemos a la brevedad.</p>
                <p style="margin: 0;">Muchas Gracias por su comprensión.</p>
              </div>
              <div style="margin-bottom:20px;">
                <p style="text-align:center;font-weight:700;margin:0;margin-bottom:5px;">Vista previa de la Reservación</p>
                <p style="text-align:center;"><span style="font-weight:700;">Fecha:</span> ${fecha}       <span style="font-weight:700;margin-left: 15px;">Hora:</span> ${hora}     <span style="font-weight:700;margin-left: 15px;">Personas:</span> ${personas}</p>
              </div>
              <div style="border-top: 1px black solid;padding-top: 5px;margin-left:5px;">
                <p style="font-weight:700;margin:0;"> Contacto</p>
                <p  style="margin-left:10px;margin:0;"><span style="font-weight:700;">Teléfono:</span> +56 912345678</p>
                <p  style="margin-left:10px;margin:0;"><span style="font-weight:700;">Correo Electrónico: </span> restauranttesis@gmail.com</p>
              </div>
            </div>
        </div>

          `,
  });
};

const mesaCancelada = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, fecha, hora, personas, codigo: código } = datos;
  await transport.sendMail({
    from: "Restaurante.com",
    to: email,
    subject: "Reservación Cancelada en Restaurante.com",
    text: "Reservación Cancelada en Restaurante.com",
    html: `
          <div style="background:#845e02; padding:4px;">
            <div style="padding: 10px 15px;background: white;font-size: 17px;">
              <div style="border-bottom: 1px black solid;margin-bottom: 5px;padding-bottom: 5px;">
                <p style="margin-left:10px;font-weight:700; margin:0;">Restaurante</p>
              </div>
              <div style="margin: 10px 0;">
                <p style="margin:0;">Hola ${nombre}.</p>
                <p style="margin:0;">La reservación que has realizado a sido <span style="font-weight:700;">CANCELADA</span>.</p>
                <p style="margin:0;">Debido a que el tiempo estimado de espera, fue superado, el cual constaba de 20 minutos.</p>
              </div>
              <div style="margin-bottom:20px;">
                <p style="text-align:center;font-weight:700;margin-bottom:5px;margin:0;">Vista previa de la Reservación</p>
                <p style="text-align:center;"><span style="font-weight:700;margin:0;">Fecha:</span> ${fecha}       <span style="font-weight:700; margin-left: 15px;">Hora:</span> ${hora}     <span style="font-weight:700;margin-left: 15px;">Personas:</span> ${personas}</p>
              </div>
              <div  style="border-top: 1px black solid;padding-top: 5px;margin-left:5px;">
                <p  style="font-weight:700;margin:0;"> Contacto</p>
                <p  style="margin-left:10px;margin:0;"><span style="font-weight:700;">Teléfono:</span> +56 912345678</p>
                <p style="margin-left:10px;margin:0;"><span  style="font-weight:700;">Correo Electrónico: </span> restauranttesis@gmail.com</p>
              </div>
            </div>
          </div>
          `,
  });
};
export {
  emailRegistro,
  emailOlvidePassword,
  mesaConfirmada,
  mesaRechazada,
  mesaCancelada,
};
