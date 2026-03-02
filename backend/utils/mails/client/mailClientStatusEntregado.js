export const sendMailDeliverySuccess = () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>¡Tu Pedido ha llegado!</title>
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
    .product-table { width:100%; border-collapse:collapse; margin:16px 0; }
    .product-table th { background:#f8fafc; text-align:left; padding:12px; font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; border-bottom:2px solid #e2e8f0; }
    .product-table td { padding:12px; border-bottom:1px solid #e2e8f0; font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569; }
    .order-summary { background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; margin:16px 0; }
    .order-summary-row { display:flex; justify-content:space-between; margin-bottom:8px; }
    .order-total { border-top:2px solid #cbd5e1; padding-top:12px; margin-top:12px; font-weight:700; color:#0f172a; }
    .status-timeline { display:flex; justify-content:space-between; margin-top:20px; position:relative; }
    .status-timeline::before { content:''; position:absolute; top:12px; left:0; right:0; height:2px; background:#e2e8f0; z-index:1; }
    .status-step { position:relative; z-index:2; text-align:center; flex:1; }
    .status-dot { width:26px; height:26px; background:#ffffff; border:2px solid #8b5cf6; border-radius:50%; margin:0 auto 8px; display:flex; align-items:center; justify-content:center; }
    .status-active .status-dot { background:#8b5cf6; border-color:#8b5cf6; }
    .status-label { font:600 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; }
  </style>
</head>
<body style="margin:0; padding:0; background:#0f172a;">
  <div class="preheader">
    ¡Tu pedido #ORD-2024-00123 ha sido entregado! Gracias por tu compra
  </div>

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <!-- Card -->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.18);">
          
          <!-- Brand header -->
          <tr>
            <td style="background:linear-gradient(135deg,#8b5cf6 0%, #7c3aed 60%, #6d28d9 100%); padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="https://tu-dominio.com/logo.png" width="120" alt="Tu Ecommerce" style="display:block; border:0;"/>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font:600 12px/1 'Segoe UI',Arial,sans-serif; color:rgba(255,255,255,.85); letter-spacing:.5px;">¡ENTREGA COMPLETADA!</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title & lead -->
          <tr>
            <td class="px" style="padding:28px 32px 6px 32px;">
              <h1 class="h1" style="margin:0 0 8px; font:700 26px/1.25 'Segoe UI',Arial,sans-serif; color:#0f172a;">
                ¡Gracias por tu compra! 🎉
              </h1>
              <p class="lead" style="margin:0; font:400 16px/1.6 'Segoe UI',Arial,sans-serif; color:#334155;">
                Hola <b>María</b>, queríamos informarte que tu pedido ha llegado a su destino. Esperamos que disfrutes mucho tus nuevos productos.
              </p>
            </td>
          </tr>

          <!-- Thank You Message -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:12px; padding:20px; text-align:center;">
                <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#7c3aed; margin-bottom:12px;">¡Tu confianza nos inspira!</div>
                <div style="font:400 15px/1.6 'Segoe UI',Arial,sans-serif; color:#5b21b6;">
                  Agradecemos profundamente que hayas elegido nuestros productos. Tu satisfacción es nuestra mayor recompensa y nos motiva a seguir mejorando cada día.
                </div>
                <div style="margin-top:16px; font:italic 14px/1.5 'Segoe UI',Arial,sans-serif; color:#7c3aed;">
                  "Gracias por ser parte de nuestra familia de clientes"
                </div>
              </div>
            </td>
          </tr>

          <!-- Order Status Timeline -->
          <tr>
            <td style="padding:20px 32px 10px 32px;">
              <div class="status-timeline">
                <div class="status-step status-active">
                  <div class="status-dot">✓</div>
                  <div class="status-label">Confirmado</div>
                </div>
                <div class="status-step status-active">
                  <div class="status-dot">✓</div>
                  <div class="status-label">Preparado</div>
                </div>
                <div class="status-step status-active">
                  <div class="status-dot">✓</div>
                  <div class="status-label">Enviado</div>
                </div>
                <div class="status-step status-active">
                  <div class="status-dot" style="background:#8b5cf6; border-color:#8b5cf6; color:white; font-weight:bold;">✓</div>
                  <div class="status-label" style="color:#8b5cf6; font-weight:700;">Entregado</div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Delivery Details -->
          <tr>
            <td style="padding:6px 32px;">
              <div style="background:#fafafa; border:1px solid #e5e7eb; border-radius:12px; padding:16px;">
                <div style="display:flex; justify-content:space-between; flex-wrap:wrap; margin-bottom:12px;">
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#7c3aed; margin-bottom:4px;">Número de pedido</div>
                    <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">#ORD-2024-00123</div>
                  </div>
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#7c3aed; margin-bottom:4px;">Fecha de entrega</div>
                    <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">17 de marzo, 2024</div>
                  </div>
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#7c3aed; margin-bottom:4px;">Estado</div>
                    <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#8b5cf6;">Entregado con éxito</div>
                  </div>
                </div>
                
                <div style="margin-top:12px; padding-top:12px; border-top:1px dashed #e5e7eb;">
                  <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:8px;">📬 Dirección de entrega:</div>
                  <div style="font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569;">
                    María González Rodríguez<br/>
                    Av. Reforma #456, Piso 3<br/>
                    Col. Juárez, Cuauhtémoc<br/>
                    Ciudad de México, 06600
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Product Details -->
          <tr>
            <td style="padding:20px 32px 6px 32px;">
              <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:16px;">Tus productos</div>
              
              <table class="product-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Laptop Gaming Pro</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">RTX 4070 • 16GB RAM • 1TB SSD</div>
                    </td>
                    <td>1</td>
                    <td><span style="color:#8b5cf6; font-weight:600;">✓ Entregado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Mouse Inalámbrico</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">Color Negro • Recargable</div>
                    </td>
                    <td>2</td>
                    <td><span style="color:#8b5cf6; font-weight:600;">✓ Entregado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Teclado Mecánico</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">Switch Red • RGB</div>
                    </td>
                    <td>1</td>
                    <td><span style="color:#8b5cf6; font-weight:600;">✓ Entregado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Funda para Laptop</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">15.6" • Color Gris</div>
                    </td>
                    <td>1</td>
                    <td><span style="color:#8b5cf6; font-weight:600;">✓ Entregado</span></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Care Instructions -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#fef3f2; border:1px solid #fecaca; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#dc2626; margin-bottom:6px;">💡 Para que disfrutes al máximo:</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#7c2d12;">
                  1. <b>Guarda los empaques</b> por al menos 15 días<br/>
                  2. <b>Registra tu producto</b> para activar la garantía<br/>
                  3. <b>Descarga los manuales</b> en nuestro sitio web<br/>
                  4. <b>Conserva tu factura</b> para futuras referencias
                </div>
              </div>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:6px;">🌟 Tu opinión nos importa</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#475569;">
                  ¿Cómo fue tu experiencia? Comparte tus comentarios para que podamos seguir mejorando y brindarte el mejor servicio.
                </div>
              </div>
            </td>
          </tr>

          <!-- CTA Buttons -->
          <tr>
            <td align="center" style="padding:10px 32px 20px;">
              <a class="btn" href="https://tu-dominio.com/mi-cuenta/pedidos/ORD-2024-00123/resena" 
                 style="display:inline-block; background:#8b5cf6; color:#ffffff; text-decoration:none; font:700 15px/1 'Segoe UI',Arial,sans-serif; padding:14px 26px; border-radius:10px; box-shadow:0 6px 16px rgba(139,92,246,.35); margin:0 8px 10px;">
                Dejar mi reseña
              </a>
              <a href="https://tu-dominio.com/tienda" 
                 style="display:inline-block; background:#ffffff; color:#8b5cf6; text-decoration:none; font:700 15px/1 'Segoe UI',Arial,sans-serif; padding:14px 26px; border-radius:10px; border:2px solid #8b5cf6; margin:0 8px 10px;">
                Ver más productos
              </a>
            </td>
          </tr>

          <!-- Support Section -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0369a1; margin-bottom:6px;">¿Necesitas ayuda?</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#0369a1;">
                  • <b>Soporte técnico:</b> <a href="mailto:soporte@tu-dominio.com" style="color:#8b5cf6; text-decoration:none;">soporte@tu-dominio.com</a><br/>
                  • <b>Garantías:</b> <a href="https://tu-dominio.com/garantias" style="color:#8b5cf6; text-decoration:none;">Información completa aquí</a><br/>
                  • <b>Atención:</b> <a href="tel:+525512345678" style="color:#8b5cf6; text-decoration:none;">+52 55 1234 5678</a>
                </div>
              </div>
            </td>
          </tr>

          <!-- Social & Contact -->
          <tr>
            <td align="center" style="padding:8px 28px;">
              <div style="margin-bottom:12px;">
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
              <a href="https://tu-dominio.com/ayuda" style="font:600 13px/1 'Segoe UI',Arial,sans-serif; color:#8b5cf6; text-decoration:none;">Centro de ayuda</a>
              <span style="color:#cbd5e1; margin:0 8px;">•</span>
              <a href="https://tu-dominio.com/contacto" style="font:600 13px/1 'Segoe UI',Arial,sans-serif; color:#8b5cf6; text-decoration:none;">Contáctanos</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 28px 28px; background:#ffffff; text-align:center;">
              <p style="margin:0 0 8px; font:400 12px/1.6 'Segoe UI',Arial,sans-serif; color:#64748b;">
                ¡Gracias por confiar en nosotros! Este es un correo automático de confirmación de entrega.
              </p>
              <p style="margin:0; font:400 11px/1.6 'Segoe UI',Arial,sans-serif; color:#94a3b8;">
                © ${new Date().getFullYear()} Tu Ecommerce. Todos los derechos reservados. 
                <br/>Av. Siempre Viva 123, CDMX, México.
                <br/><a href="https://tu-dominio.com/privacidad" style="color:#94a3b8; text-decoration:none;">Política de privacidad</a> • 
                <a href="https://tu-dominio.com/terminos" style="color:#94a3b8; text-decoration:none;">Términos y condiciones</a>
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