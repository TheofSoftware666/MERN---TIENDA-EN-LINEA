export const sendMailEnviado = () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>¡Tu Pedido está en Camino!</title>
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
    .status-dot { width:26px; height:26px; background:#ffffff; border:2px solid #3b82f6; border-radius:50%; margin:0 auto 8px; display:flex; align-items:center; justify-content:center; }
    .status-active .status-dot { background:#3b82f6; border-color:#3b82f6; }
    .status-label { font:600 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; }
  </style>
</head>
<body style="margin:0; padding:0; background:#0f172a;">
  <div class="preheader">
    ¡Buenas noticias! Tu pedido #ORD-2024-00123 ha sido enviado. Número de seguimiento: TRK-789654321.
  </div>

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <!-- Card -->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.18);">
          
          <!-- Brand header -->
          <tr>
            <td style="background:linear-gradient(135deg,#3b82f6 0%, #2563eb 60%, #1d4ed8 100%); padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="https://tu-dominio.com/logo.png" width="120" alt="Tu Ecommerce" style="display:block; border:0;"/>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font:600 12px/1 'Segoe UI',Arial,sans-serif; color:rgba(255,255,255,.85); letter-spacing:.5px;">¡PEDIDO ENVIADO!</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title & lead -->
          <tr>
            <td class="px" style="padding:28px 32px 6px 32px;">
              <h1 class="h1" style="margin:0 0 8px; font:700 26px/1.25 'Segoe UI',Arial,sans-serif; color:#0f172a;">
                ¡Tu pedido está en camino! 🚚
              </h1>
              <p class="lead" style="margin:0; font:400 16px/1.6 'Segoe UI',Arial,sans-serif; color:#334155;">
                Hola <b>María</b>, tenemos excelentes noticias: tu pedido ya ha sido enviado. A continuación encontrarás todos los detalles de seguimiento.
              </p>
            </td>
          </tr>

          <!-- Tracking Information -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#eff6ff; border:1px solid #dbeafe; border-radius:12px; padding:20px;">
                <div style="display:flex; align-items:center; margin-bottom:12px;">
                  <div style="width:24px; height:24px; background:#3b82f6; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-right:12px; color:white; font-weight:bold;">📦</div>
                  <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#1e40af;">¡Tu paquete está en movimiento!</div>
                </div>
                <div style="font:400 14px/1.6 'Segoe UI',Arial,sans-serif; color:#1e40af;">
                  Tu pedido ha sido recogido por nuestro servicio de mensajería y está en camino a la dirección de entrega.
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
                  <div class="status-dot" style="background:#3b82f6; border-color:#3b82f6; color:white; font-weight:bold;">🚚</div>
                  <div class="status-label" style="color:#3b82f6; font-weight:700;">Enviado</div>
                </div>
                <div class="status-step">
                  <div class="status-dot"></div>
                  <div class="status-label">Entregado</div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Shipping & Tracking Details -->
          <tr>
            <td style="padding:6px 32px;">
              <div style="background:#fafafa; border:1px solid #e5e7eb; border-radius:12px; padding:16px;">
                <div style="display:flex; justify-content:space-between; flex-wrap:wrap; margin-bottom:12px;">
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#2563eb; margin-bottom:4px;">Número de pedido</div>
                    <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">#ORD-2024-00123</div>
                  </div>
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#2563eb; margin-bottom:4px;">Fecha de envío</div>
                    <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">18 de marzo, 2024</div>
                  </div>
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#2563eb; margin-bottom:4px;">Estado actual</div>
                    <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#3b82f6;">Enviado ✓</div>
                  </div>
                </div>
                
                <div style="margin-top:12px; padding-top:12px; border-top:1px dashed #e5e7eb;">
                  <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:8px;">📬 Información de envío:</div>
                  <div style="font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569;">
                    María González Rodríguez<br/>
                    Av. Reforma #456, Piso 3<br/>
                    Col. Juárez, Cuauhtémoc<br/>
                    Ciudad de México, 06600
                  </div>
                </div>
                
                <div style="margin-top:12px; padding-top:12px; border-top:1px dashed #e5e7eb;">
                  <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:8px;">📦 Datos de seguimiento:</div>
                  <div style="background:#eff6ff; border:1px solid #dbeafe; border-radius:8px; padding:12px; margin-top:8px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div>
                        <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#2563eb; margin-bottom:4px;">Número de guía</div>
                        <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">TRK-789654321</div>
                      </div>
                      <div>
                        <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#2563eb; margin-bottom:4px;">Transportista</div>
                        <div style="font:700 14px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Mensajería Express MX</div>
                      </div>
                    </div>
                    <div style="margin-top:8px; font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569;">
                      <span style="color:#3b82f6; font-weight:600;">Última actualización:</span> Paquete en tránsito - Centro de distribución CDMX
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Estimated Delivery -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:16px;">
                <div style="font:700 15px/1.4 'Segoe UI',Arial,sans-serif; color:#059669; margin-bottom:8px;">📅 Entrega estimada:</div>
                <div style="display:flex; align-items:center; margin-bottom:8px;">
                  <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-right:12px;">19 de marzo, 2024</div>
                  <div style="font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569;">
                    (1-2 días hábiles)
                  </div>
                </div>
                <div style="font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569;">
                  Horario de entrega: 9:00 AM - 7:00 PM<br/>
                  <span style="font-size:12px; color:#64748b;">*La fecha puede variar según condiciones del tráfico y clima</span>
                </div>
              </div>
            </td>
          </tr>

          <!-- Product Details -->
          <tr>
            <td style="padding:20px 32px 6px 32px;">
              <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:16px;">Productos enviados</div>
              
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
                    <td><span style="color:#3b82f6; font-weight:600;">✓ Enviado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Mouse Inalámbrico</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">Color Negro • Recargable</div>
                    </td>
                    <td>2</td>
                    <td><span style="color:#3b82f6; font-weight:600;">✓ Enviado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Teclado Mecánico</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">Switch Red • RGB</div>
                    </td>
                    <td>1</td>
                    <td><span style="color:#3b82f6; font-weight:600;">✓ Enviado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Funda para Laptop</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">15.6" • Color Gris</div>
                    </td>
                    <td>1</td>
                    <td><span style="color:#3b82f6; font-weight:600;">✓ Enviado</span></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Delivery Instructions -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#fef3f2; border:1px solid #fecaca; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#dc2626; margin-bottom:6px;">📝 Para una entrega exitosa:</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#7c2d12;">
                  1. <b>Verifica tu información</b> de contacto<br/>
                  2. <b>Asegúrate</b> de que alguien reciba el paquete<br/>
                  3. <b>Revisa</b> el producto al momento de la entrega<br/>
                  4. <b>Conserva</b> el comprobante de entrega
                </div>
              </div>
            </td>
          </tr>

          <!-- Tracking Instructions -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:6px;">📍 ¿Cómo seguir mi pedido?</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#475569;">
                  Puedes rastrear tu pedido en tiempo real usando el número de guía proporcionado. Recibirás notificaciones cuando el paquete esté próximo a entregarse.
                </div>
              </div>
            </td>
          </tr>

          <!-- CTA Buttons -->
          <tr>
            <td align="center" style="padding:10px 32px 20px;">
              <a class="btn" href="https://mensajeria-express-mx.com/rastreo/TRK-789654321" 
                 style="display:inline-block; background:#3b82f6; color:#ffffff; text-decoration:none; font:700 15px/1 'Segoe UI',Arial,sans-serif; padding:14px 26px; border-radius:10px; box-shadow:0 6px 16px rgba(59,130,246,.35); margin:0 8px 10px;">
                Rastrear mi pedido
              </a>
              <a href="https://tu-dominio.com/mi-cuenta/pedidos/ORD-2024-00123" 
                 style="display:inline-block; background:#ffffff; color:#3b82f6; text-decoration:none; font:700 15px/1 'Segoe UI',Arial,sans-serif; padding:14px 26px; border-radius:10px; border:2px solid #3b82f6; margin:0 8px 10px;">
                Ver detalles
              </a>
            </td>
          </tr>

          <!-- Support Section -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0369a1; margin-bottom:6px;">¿Necesitas ayuda con el envío?</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#0369a1;">
                  • <b>Cambiar dirección:</b> Contacta al transportista si es urgente<br/>
                  • <b>Horario de entrega:</b> El repartidor te contactará el día de entrega<br/>
                  • <b>Contacto transportista:</b> <a href="tel:+5255987654321" style="color:#3b82f6; text-decoration:none;">+52 55 9876 5432</a>
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
              <a href="https://tu-dominio.com/ayuda" style="font:600 13px/1 'Segoe UI',Arial,sans-serif; color:#3b82f6; text-decoration:none;">Centro de ayuda</a>
              <span style="color:#cbd5e1; margin:0 8px;">•</span>
              <a href="https://tu-dominio.com/contacto" style="font:600 13px/1 'Segoe UI',Arial,sans-serif; color:#3b82f6; text-decoration:none;">Contáctanos</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 28px 28px; background:#ffffff; text-align:center;">
              <p style="margin:0 0 8px; font:400 12px/1.6 'Segoe UI',Arial,sans-serif; color:#64748b;">
                ¡Estamos emocionados de que pronto recibas tu pedido! Este es un correo automático de notificación de envío.
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