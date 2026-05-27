export const cuentaValidada = ( nombre  ) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>¡Bienvenido a Tu Ecommerce!</title>
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
    ¡Bienvenido! Tu cuenta ha sido verificada y ya puedes disfrutar de todos los beneficios en Tu Ecommerce.
  </div>

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <!-- Card -->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.18);">
          
          <!-- Brand header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0ea5e9 0%, #2563eb 60%, #1e40af 100%); padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="https://tu-dominio.com/logo.png" width="120" alt="Tu Ecommerce" style="display:block; border:0;"/>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font:600 12px/1 'Segoe UI',Arial,sans-serif; color:rgba(255,255,255,.85); letter-spacing:.5px;">CUENTA VERIFICADA</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title & lead -->
          <tr>
            <td class="px" style="padding:28px 32px 6px 32px;">
              <h1 class="h1" style="margin:0 0 8px; font:700 26px/1.25 'Segoe UI',Arial,sans-serif; color:#0f172a;">
                ¡Bienvenido, ${nombre}!
              </h1>
              <p class="lead" style="margin:0; font:400 16px/1.6 'Segoe UI',Arial,sans-serif; color:#334155;">
                Gracias por verificar tu cuenta 🎉. Ahora formas parte de <b>Tu Ecommerce</b>, un espacio donde encontrarás <span style="color:#0ea5e9; font-weight:600;">productos únicos, ofertas exclusivas</span> y una experiencia de compra pensada para ti.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:20px 32px;">
              <a class="btn" href="https://tu-dominio.com/explorar" 
                 style="display:inline-block; background:#0ea5e9; color:#ffffff; text-decoration:none; font:700 15px/1 'Segoe UI',Arial,sans-serif; padding:14px 26px; border-radius:10px; box-shadow:0 6px 16px rgba(14,165,233,.35);">
                Explorar productos
              </a>
            </td>
          </tr>

          <!-- Value props -->
          <tr>
            <td style="padding:22px 26px 10px 26px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="stack" width="33.33%" style="padding:8px;">
                    <div style="background:#f8fafc; border:1px solid #edf2f7; border-radius:12px; padding:14px;">
                      <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:6px;">Ofertas únicas</div>
                      <div style="font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569;">Accede a promociones especiales solo para miembros.</div>
                    </div>
                  </td>
                  <td class="stack" width="33.33%" style="padding:8px;">
                    <div style="background:#f8fafc; border:1px solid #edf2f7; border-radius:12px; padding:14px;">
                      <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:6px;">Envíos rápidos</div>
                      <div style="font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569;">Recibe tus compras en la puerta de tu casa en tiempo récord.</div>
                    </div>
                  </td>
                  <td class="stack" width="33.33%" style="padding:8px;">
                    <div style="background:#f8fafc; border:1px solid #edf2f7; border-radius:12px; padding:14px;">
                      <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:6px;">Atención personalizada</div>
                      <div style="font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569;">Nuestro equipo siempre estará disponible para ayudarte.</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Consejo / tip -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f1f5f9; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:6px;">Consejo para ti</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#475569;">
                  Activa las notificaciones y sé el primero en enterarte de nuevas colecciones y descuentos.
                </div>
              </div>
            </td>
          </tr>

          <!-- Social + help -->
          <tr>
            <td align="center" style="padding:8px 28px;">
              <a href="https://tu-dominio.com/ayuda" style="font:600 13px/1 'Segoe UI',Arial,sans-serif; color:#0ea5e9; text-decoration:none;">Centro de ayuda</a>
              <span style="color:#cbd5e1; margin:0 8px;">•</span>
              <a href="mailto:soporte@tu-dominio.com" style="font:600 13px/1 'Segoe UI',Arial,sans-serif; color:#0ea5e9; text-decoration:none;">soporte@tu-dominio.com</a>
              <div style="margin-top:10px;">
                <a href="https://facebook.com/tu-dominio" style="margin:0 6px;">
                  <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" width="24" height="24"/>
                </a>
                <a href="https://instagram.com/tu-dominio" style="margin:0 6px;">
                  <img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram" width="24" height="24"/>
                </a>
                <a href="https://x.com/tu-dominio" style="margin:0 6px;">
                  <img src="https://cdn-icons-png.flaticon.com/24/5968/5968830.png" alt="X" width="24" height="24"/>
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 28px 28px; background:#ffffff; text-align:center;">
              <p style="margin:0 0 8px; font:400 12px/1.6 'Segoe UI',Arial,sans-serif; color:#64748b;">
                Gracias por unirte a nuestra comunidad. Estamos felices de tenerte aquí.
              </p>
              <p style="margin:0; font:400 11px/1.6 'Segoe UI',Arial,sans-serif; color:#94a3b8;">
                © ${new Date().getFullYear()} Tu Ecommerce. Todos los derechos reservados. 
                <br/>Av. Siempre Viva 123, CDMX, México.
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
