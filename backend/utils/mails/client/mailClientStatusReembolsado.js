export const sendMailReembolsado = () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reembolso Completado</title>
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
    .status-dot { width:26px; height:26px; background:#ffffff; border:2px solid #10b981; border-radius:50%; margin:0 auto 8px; display:flex; align-items:center; justify-content:center; }
    .status-active .status-dot { background:#10b981; border-color:#10b981; }
    .status-label { font:600 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; }
  </style>
</head>
<body style="margin:0; padding:0; background:#0f172a;">
  <div class="preheader">
    ¡Tu reembolso ha sido procesado! El monto de $31,761.60 MXN ha sido devuelto a tu cuenta.
  </div>

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <!-- Card -->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.18);">
          
          <!-- Brand header -->
          <tr>
            <td style="background:linear-gradient(135deg,#10b981 0%, #059669 60%, #047857 100%); padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="https://tu-dominio.com/logo.png" width="120" alt="Tu Ecommerce" style="display:block; border:0;"/>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font:600 12px/1 'Segoe UI',Arial,sans-serif; color:rgba(255,255,255,.85); letter-spacing:.5px;">REEMBOLSO COMPLETADO</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title & lead -->
          <tr>
            <td class="px" style="padding:28px 32px 6px 32px;">
              <h1 class="h1" style="margin:0 0 8px; font:700 26px/1.25 'Segoe UI',Arial,sans-serif; color:#0f172a;">
                ¡Tu reembolso ha sido procesado! ✅
              </h1>
              <p class="lead" style="margin:0; font:400 16px/1.6 'Segoe UI',Arial,sans-serif; color:#334155;">
                Hola <b>María</b>, nos da mucho gusto informarte que tu reembolso ha sido completado exitosamente. A continuación encontrarás todos los detalles.
              </p>
            </td>
          </tr>

          <!-- Success Message -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:20px;">
                <div style="display:flex; align-items:center; margin-bottom:12px;">
                  <div style="width:24px; height:24px; background:#10b981; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-right:12px; color:white; font-weight:bold;">✓</div>
                  <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#065f46;">¡Reembolso exitoso!</div>
                </div>
                <div style="font:400 14px/1.6 'Segoe UI',Arial,sans-serif; color:#065f46;">
                  El monto ha sido devuelto a tu método de pago original. El proceso se ha completado satisfactoriamente.
                </div>
              </div>
            </td>
          </tr>

          <!-- Refund Status -->
          <tr>
            <td style="padding:20px 32px 10px 32px;">
              <div style="text-align:center; padding:16px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px;">
                <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#059669; margin-bottom:8px;">💰 Reembolso Completado</div>
                <div style="font:400 14px/1.6 'Segoe UI',Arial,sans-serif; color:#047857;">
                  El proceso de devolución de fondos ha finalizado exitosamente.
                </div>
              </div>
            </td>
          </tr>

          <!-- Refund Details -->
          <tr>
            <td style="padding:6px 32px;">
              <div style="background:#fafafa; border:1px solid #e5e7eb; border-radius:12px; padding:16px;">
                <div style="display:flex; justify-content:space-between; flex-wrap:wrap; margin-bottom:12px;">
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#059669; margin-bottom:4px;">Número de pedido</div>
                    <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">#ORD-2024-00123</div>
                  </div>
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#059669; margin-bottom:4px;">Fecha de reembolso</div>
                    <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">20 de marzo, 2024</div>
                  </div>
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#059669; margin-bottom:4px;">Estado</div>
                    <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#10b981;">Reembolsado ✓</div>
                  </div>
                </div>
                
                <div style="margin-top:12px; padding-top:12px; border-top:1px dashed #e5e7eb;">
                  <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:8px;">📋 Referencia de reembolso:</div>
                  <div style="font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569;">
                    REF-REEMB-2024-0456
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Refund Summary -->
          <tr>
            <td style="padding:6px 32px 20px 32px;">
              <div class="order-summary">
                <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:16px;">Detalles del reembolso</div>
                
                <div class="order-summary-row">
                  <span style="font:400 14px/1.4 'Segoe UI',Arial,sans-serif; color:#475569;">Monto reembolsado:</span>
                  <span style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#10b981;">$31,761.60 MXN</span>
                </div>
                
                <div class="order-summary-row">
                  <span style="font:400 14px/1.4 'Segoe UI',Arial,sans-serif; color:#475569;">Método de devolución:</span>
                  <span style="font:600 14px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Tarjeta de crédito terminada en 1234</span>
                </div>
                
                <div class="order-summary-row">
                  <span style="font:400 14px/1.4 'Segoe UI',Arial,sans-serif; color:#475569;">Fecha de procesamiento:</span>
                  <span style="font:600 14px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">19 de marzo, 2024</span>
                </div>
                
                <div class="order-summary-row">
                  <span style="font:400 14px/1.4 'Segoe UI',Arial,sans-serif; color:#475569;">Fecha de completado:</span>
                  <span style="font:600 14px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">20 de marzo, 2024</span>
                </div>
                
                <div style="margin-top:16px; padding-top:16px; border-top:1px dashed #cbd5e1;">
                  <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:8px;">📝 Información importante:</div>
                  <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#475569;">
                    • El monto aparecerá en tu estado de cuenta en 1-3 días hábiles<br/>
                    • Puedes verificar el movimiento en tu aplicación bancaria<br/>
                    • Conserva esta confirmación para cualquier referencia futura
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Original Order Products -->
          <tr>
            <td style="padding:20px 32px 6px 32px;">
              <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:16px;">Productos del pedido original</div>
              
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
                    <td><span style="color:#10b981; font-weight:600;">✓ Reembolsado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Mouse Inalámbrico</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">Color Negro • Recargable</div>
                    </td>
                    <td>2</td>
                    <td><span style="color:#10b981; font-weight:600;">✓ Reembolsado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Teclado Mecánico</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">Switch Red • RGB</div>
                    </td>
                    <td>1</td>
                    <td><span style="color:#10b981; font-weight:600;">✓ Reembolsado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Funda para Laptop</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">15.6" • Color Gris</div>
                    </td>
                    <td>1</td>
                    <td><span style="color:#10b981; font-weight:600;">✓ Reembolsado</span></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:6px;">📋 ¿Qué sigue?</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#475569;">
                  1. <b>Verifica tu cuenta</b> en 1-3 días hábiles para ver el reembolso<br/>
                  2. <b>Revisa tu extracto bancario</b> para confirmar el movimiento<br/>
                  3. <b>Conserva esta confirmación</b> para futuras referencias<br/>
                  4. <b>Contáctanos</b> si no ves el reembolso después de 5 días hábiles
                </div>
              </div>
            </td>
          </tr>

          <!-- Appreciation Message -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0369a1; margin-bottom:6px;">🌟 Agradecemos tu paciencia</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#0369a1;">
                  Valoramos tu comprensión durante este proceso. Esperamos poder servirte nuevamente en el futuro y brindarte una excelente experiencia de compra.
                </div>
              </div>
            </td>
          </tr>

          <!-- CTA Buttons -->
          <tr>
            <td align="center" style="padding:10px 32px 20px;">
              <a class="btn" href="https://tu-dominio.com/mi-cuenta/reembolsos" 
                 style="display:inline-block; background:#10b981; color:#ffffff; text-decoration:none; font:700 15px/1 'Segoe UI',Arial,sans-serif; padding:14px 26px; border-radius:10px; box-shadow:0 6px 16px rgba(16,185,129,.35); margin:0 8px 10px;">
                Ver mis reembolsos
              </a>
              <a href="https://tu-dominio.com/tienda" 
                 style="display:inline-block; background:#ffffff; color:#10b981; text-decoration:none; font:700 15px/1 'Segoe UI',Arial,sans-serif; padding:14px 26px; border-radius:10px; border:2px solid #10b981; margin:0 8px 10px;">
                Explorar productos
              </a>
            </td>
          </tr>

          <!-- Support Section -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#fefce8; border:1px solid #fef08a; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#854d0e; margin-bottom:6px;">¿Tienes preguntas sobre el reembolso?</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#854d0e;">
                  • <b>Soporte de reembolsos:</b> <a href="mailto:reembolsos@tu-dominio.com" style="color:#10b981; text-decoration:none;">reembolsos@tu-dominio.com</a><br/>
                  • <b>Atención al cliente:</b> <a href="tel:+525512345678" style="color:#10b981; text-decoration:none;">+52 55 1234 5678</a><br/>
                  • <b>Horario:</b> Lunes a Viernes de 9:00 AM a 6:00 PM
                </div>
              </div>
            </td>
          </tr>

          <!-- Thank You Message -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:12px; padding:16px; text-align:center;">
                <div style="font:italic 14px/1.6 'Segoe UI',Arial,sans-serif; color:#5b21b6;">
                  Gracias por confiar en nosotros. Esperamos verte pronto en nuestra tienda.
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
              <a href="https://tu-dominio.com/ayuda" style="font:600 13px/1 'Segoe UI',Arial,sans-serif; color:#10b981; text-decoration:none;">Centro de ayuda</a>
              <span style="color:#cbd5e1; margin:0 8px;">•</span>
              <a href="https://tu-dominio.com/contacto" style="font:600 13px/1 'Segoe UI',Arial,sans-serif; color:#10b981; text-decoration:none;">Contáctanos</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 28px 28px; background:#ffffff; text-align:center;">
              <p style="margin:0 0 8px; font:400 12px/1.6 'Segoe UI',Arial,sans-serif; color:#64748b;">
                Este es un correo automático de confirmación de reembolso completado.
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