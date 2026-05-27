const suscriptionMail = () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>¡Bienvenido a nuestra comunidad!</title>
  <style>
    .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; }
    @media screen and (max-width:600px){
      .container{ width:100% !important; }
      .px{ padding-left:20px !important; padding-right:20px !important; }
      .h1{ font-size:24px !important; }
      .lead{ font-size:15px !important; }
      .btn{ padding:14px 22px !important; font-size:16px !important; }
      .stack{ display:block !important; width:100% !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:#0f172a;">
  <div class="preheader">
    Gracias por suscribirte. Estamos felices de darte la bienvenida. Descubre todas las novedades y ofertas exclusivas.
  </div>

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <!-- Card -->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.18);">
          
          <!-- Brand header -->
          <tr>
            <td style="background:linear-gradient(135deg,#f43f5e 0%, #e11d48 60%, #be123c 100%); padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="https://tu-dominio.com/logo.png" width="120" alt="Tu Ecommerce" style="display:block; border:0;"/>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font:600 12px/1 'Segoe UI',Arial,sans-serif; color:rgba(255,255,255,.9); letter-spacing:.5px;">BIENVENIDA</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title & lead -->
          <tr>
            <td class="px" style="padding:28px 32px 6px 32px;">
              <h1 class="h1" style="margin:0 0 8px; font:700 26px/1.25 'Segoe UI',Arial,sans-serif; color:#0f172a;">
                ¡Hola y bienvenido!
              </h1>
              <p class="lead" style="margin:0; font:400 16px/1.6 'Segoe UI',Arial,sans-serif; color:#334155;">
                Gracias por suscribirte a nuestro boletín. A partir de ahora recibirás las últimas noticias, ofertas exclusivas y contenido especial directamente en tu bandeja de entrada.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:20px 32px;">
              <a class="btn" href="https://tu-dominio.com/tienda" 
                 style="display:inline-block; background:#e11d48; color:#ffffff; text-decoration:none; font:700 15px/1 'Segoe UI',Arial,sans-serif; padding:14px 26px; border-radius:10px; box-shadow:0 6px 16px rgba(225,29,72,.35);">
                Visitar la tienda
              </a>
            </td>
          </tr>

          <!-- Beneficios extra -->
          <tr>
            <td style="padding:22px 26px 10px 26px;">
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:6px;">¿Qué sigue?</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#475569;">
                  Mantente atento a nuestros correos. Pronto recibirás un <b>cupón de bienvenida</b> y acceso anticipado a promociones.
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 28px 28px; background:#ffffff; text-align:center;">
              <p style="margin:0 0 8px; font:400 12px/1.6 'Segoe UI',Arial,sans-serif; color:#64748b;">
                Si no te suscribiste o crees que es un error, puedes ignorar este correo o 
                <a href="https://tu-dominio.com/contacto" style="color:#e11d48; text-decoration:underline;">contactarnos aquí</a>.
              </p>
              <p style="margin:12px 0 0; font:400 11px/1.6 'Segoe UI',Arial,sans-serif; color:#94a3b8;">
                © ${new Date().getFullYear()} Tu Ecommerce. Todos los derechos reservados.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export { suscriptionMail };