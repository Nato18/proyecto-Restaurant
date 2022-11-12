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
    subject: "Confirmacion de Cuenta para Restaurante",
    html: `
          <style>
            p{
              margin: 0;
            }
            .fondo{
              background: #845e02;
              padding:4px;
            }
            .contenedor{
              padding: 10px 15px;
              background: white;
              font-size: 17px;
            }
            .spanDatos{
              font-weight:500;
            }
            .borderBotMargin{
              border-bottom: 1px black solid;
              margin-bottom: 5px;
              padding-bottom: 5px;
            }
            .marginLeftP{
              margin-left:10px;
            }
            .texto700{
              font-weight:700;
            }
            .bordeTop{
              border-top: 1px black solid;
              padding-top: 5px;
            }
            .marginLeftDiv{
              margin-left:5px;
            }
            .marginTexto{
              margin: 10px 0;
            }

          </style>
          <div class="fondo">
            <div class="contenedor">
              <div class="borderBotMargin">
                <p class="marginLeftP texto700">Restaurante</p>
              </div>
              <div class="marginTexto">
                <p>Hola ${nombre}.</p>
                <p>Tu cuenta ya esta lista, solo falta confirmar en el siguiente enlace:
                <a href="${process.env.CONFIRM_URL}:${
      process.env.PORT ?? 3000
    }/auth/confirmar/${token}">Confirmar Cuenta</a> </p>
                <p>Si tu no creaste esta cuenta, puedes ignorar el correo.</p>
              </div>
              <div class="bordeTop marginLeftDiv">
                <p class="texto700"> Contacto</p>
                <p class="marginLeftP"><span class="spanDatos">Telefono:</span> +56 912345678</p>
                <p class="marginLeftP"><span class="spanDatos">Correo Electronico: </span> tesisrestaurante@gmail.com</p>
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
    subject: "Reestablece tu Password en Restaurante.com",
    text: "Reestablece tu Password en Restaurante.com",
    html: `
          <style>
          p{
            margin: 0;
          }
          .fondo{
            background: #845e02;
            padding:4px;
          }
          .contenedor{
            padding: 10px 15px;
            background: white;
            font-size: 17px;
          }
          .spanDatos{
            font-weight:500;
          }
          .borderBotMargin{
            border-bottom: 1px black solid;
            margin-bottom: 5px;
            padding-bottom: 5px;
          }
          .marginLeftP{
            margin-left:10px;
          }
          .texto700{
            font-weight:700;
          }
          .bordeTop{
            border-top: 1px black solid;
            padding-top: 5px;
          }
          .marginLeftDiv{
            margin-left:5px;
          }
          .marginTexto{
            margin: 10px 0;
          }
        </style>
        <div class="fondo">
          <div class="contenedor">
            <div class="borderBotMargin">
              <p class="marginLeftP texto700">Restaurante</p>
            </div>
            <div class="marginTexto">
              <p>Hola ${nombre}.</p>
              <p>Has solicitado reestablecer tu contraseña en restaurante.com</p>
              <p>Sigue el siguiente enlace para generar una contraseña nueva:
              <a href="${process.env.CONFIRM_URL}/auth/olvide-password/${token}">Restablecer Contraseña</a></p>
              <p>Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p>
            </div>
            <div class="bordeTop marginLeftDiv">
              <p class="texto700"> Contacto</p>
              <p class="marginLeftP"><span class="spanDatos">Telefono:</span> +56 912345678</p>
              <p class="marginLeftP"><span class="spanDatos">Correo Electronico: </span> tesisrestaurante@gmail.com</p>
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

  const { email, nombre, fecha, hora, personas, codigo } = datos;
  await transport.sendMail({
    from: "Restaurante.com",
    to: email,
    subject: "Reservacion Confirmada en Restaurante.com",
    text: "Reservacion Confirmada en Restaurante.com",
    html: `

          <style>  
            p{
              margin: 0;
            }
            .fondo{
              background: #845e02;
              padding:4px;
            }
            .contenedor{
              padding: 10px 15px;
              background: white;
              font-size: 17px;
            }
            .marginDiv{
              margin-bottom: 10px
            }
            .vista{
              text-align:center;
              font-weight:700;
            }
            .datos{
              text-align:center;
            }
            .spanDatos{
              font-weight:500;
            }
            .texto700{
              font-weight:700;
            }
            .bordeTop{
              border-top: 1px black solid;
              padding-top: 5px;
            }
            .marginLeftDiv{
              margin-left:5px;
            }
            .marginLeftP{
              margin-left:10px;
            }
            .gap{
              margin-left: 15px;
            }
            .codigo{
              text-transform: Uppercase;
            }
            .borderBotMargin{
              border-bottom: 1px black solid;
              margin-bottom: 5px;
              padding-bottom: 5px;
            }
            .marginTexto{
              margin: 10px 0;
            }
            .masMargin{
              margin-bottom:20px;
            }
            .marginEntreTexto{
              margin-bottom:5px;
            }
          </style>
          <div class="fondo">
            <div class="contenedor">
              <div class="borderBotMargin">
                <p class="marginLeftP texto700">Restaurante</p>
              </div>
              <div class="marginTexto">
                <p>Hola ${nombre}.</p>
                <p>La reservacion que has realizado a sido <span class="spanDatos">CONFIRMADA</span>.</p>
                <p>Porfavor llegar con 10 minutos de antelacion al restaurante y presenta el siguiente codigo en la entrada para hacer el ingreso.</p>
              </div>
              <div class="marginDiv">
                <p class="vista marginEntreTexto">Codigo</p>
                <p class="datos codigo">${codigo}</p>
              </div>
              <div class="masMargin">
                <p class="vista marginEntreTexto">Vista previa de la Reservacion</p>
                <p class="datos"><span class="spanDatos ">Fecha:</span> ${fecha}       <span class="spanDatos gap">Hora:</span> ${hora}     <span class="spanDatos gap">Personas:</span> ${personas}</p>
              </div>
              <div class="bordeTop marginLeftDiv">
                <p class="texto700"> Contacto</p>
                <p class="marginLeftP"><span class="spanDatos">Telefono:</span> +56 912345678</p>
                <p class="marginLeftP"><span class="spanDatos">Correo Electronico: </span> tesisrestaurante@gmail.com</p>
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
    subject: "Reservacion Rechazada en Restaurante.com",
    text: "Reservacion Rechazada en Restaurante.com",
    html: `
         <style>
          p{
            margin: 0;
          }
          .fondo{
            background: #845e02;
            padding:4px;
          }
          .contenedor{
            padding: 10px 15px;
            background: white;
            font-size: 17px;
          }
          .vista{
            text-align:center;
            font-weight:700;
          }
          .datos{
            text-align:center;
          }
          .spanDatos{
            font-weight:500;
          }
          .texto700{
            font-weight:700;
          }
          .bordeTop{
            border-top: 1px black solid;
            padding-top: 5px;
          }
          .marginLeftDiv{
            margin-left:5px;
          }
          .marginLeftP{
            margin-left:10px;
          }
          .gap{
            margin-left: 15px;
          }
          .borderBotMargin{
            border-bottom: 1px black solid;
            margin-bottom: 5px;
            padding-bottom: 5px;
          }
          .marginTexto{
            margin: 10px 0;
          }
          .masMargin{
            margin-bottom:20px;
          }
          .marginEntreTexto{
            margin-bottom:5px;
          }
        </style>
        <div class="fondo">
            <div class="contenedor">
              <div class="borderBotMargin">
                <p class="marginLeftP texto700">Restaurante</p>
              </div>
              <div class="marginTexto">
                <p>Hola ${nombre}.</p>
                <p>Lo sentimos, la reservacion que has realizado a sido <span class="spanDatos">RECHAZADA</span> .</p>
                <p>Debido a que no se encuentran mesas disponibles para la hora seleccionada. Intente otra vez o contacte con el restaurante.</p>
                <p>Responderemos a la brevedad.</p>
                <p>Muchas Gracias por su comprension.</p>
              </div>
              <div class="masMargin">
                <p class="vista marginEntreTexto">Vista previa de la Reservacion</p>
                <p class="datos"><span class="spanDatos ">Fecha:</span> ${fecha}       <span class="spanDatos gap">Hora:</span> ${hora}     <span class="spanDatos gap">Personas:</span> ${personas}</p>
              </div>
              <div class="bordeTop marginLeftDiv">
                <p class="texto700"> Contacto</p>
                <p class="marginLeftP"><span class="spanDatos">Telefono:</span> +56 912345678</p>
                <p class="marginLeftP"><span class="spanDatos">Correo Electronico: </span> tesisrestaurante@gmail.com</p>
              </div>
            </div>
        </div>

          `,
  });
};
export { emailRegistro, emailOlvidePassword, mesaConfirmada, mesaRechazada };
