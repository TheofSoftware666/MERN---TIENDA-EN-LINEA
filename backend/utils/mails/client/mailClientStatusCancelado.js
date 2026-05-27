export const sendMailCancelado = () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Actualización de tu Pedido</title>
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
    .status-dot { width:26px; height:26px; background:#ffffff; border:2px solid #ef4444; border-radius:50%; margin:0 auto 8px; display:flex; align-items:center; justify-content:center; }
    .status-active .status-dot { background:#ef4444; border-color:#ef4444; }
    .status-label { font:600 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; }
  </style>
</head>
<body style="margin:0; padding:0; background:#0f172a;">
  <div class="preheader">
    Actualización importante sobre tu pedido #ORD-2024-00123 - El pedido ha sido cancelado.
  </div>

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <!-- Card -->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.18);">
          
          <!-- Brand header -->
          <tr>
            <td style="background:linear-gradient(135deg,#ef4444 0%, #dc2626 60%, #b91c1c 100%); padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="https://tu-dominio.com/logo.png" width="120" alt="Tu Ecommerce" style="display:block; border:0;"/>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font:600 12px/1 'Segoe UI',Arial,sans-serif; color:rgba(255,255,255,.85); letter-spacing:.5px;">PEDIDO CANCELADO</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title & lead -->
          <tr>
            <td class="px" style="padding:28px 32px 6px 32px;">
              <h1 class="h1" style="margin:0 0 8px; font:700 26px/1.25 'Segoe UI',Arial,sans-serif; color:#0f172a;">
                Actualización importante sobre tu pedido ❌
              </h1>
              <p class="lead" style="margin:0; font:400 16px/1.6 'Segoe UI',Arial,sans-serif; color:#334155;">
                Hola <b>María</b>, lamentamos informarte que tu pedido ha sido cancelado. A continuación encontrarás los detalles y las opciones disponibles.
              </p>
            </td>
          </tr>

          <!-- Cancellation Notice -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:12px; padding:20px;">
                <div style="display:flex; align-items:center; margin-bottom:12px;">
                  <div style="width:24px; height:24px; background:#ef4444; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-right:12px; color:white; font-weight:bold;">!</div>
                  <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#991b1b;">Pedido cancelado</div>
                </div>
                <div style="font:400 14px/1.6 'Segoe UI',Arial,sans-serif; color:#991b1b;">
                  Tu pedido ha sido cancelado debido a: <b>Falta de disponibilidad de producto</b>. 
                  Si realizaste un pago, el reembolso se procesará automáticamente en los próximos días.
                </div>
              </div>
            </td>
          </tr>

          <!-- Cancelled Status -->
          <tr>
            <td style="padding:20px 32px 10px 32px;">
              <div style="text-align:center; padding:16px; background:#fef2f2; border:1px solid #fecaca; border-radius:12px;">
                <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#dc2626; margin-bottom:8px;">❌ Pedido Cancelado</div>
                <div style="font:400 14px/1.6 'Segoe UI',Arial,sans-serif; color:#7f1d1d;">
                  El proceso de este pedido ha sido detenido y no será entregado.
                </div>
              </div>
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding:6px 32px;">
              <div style="background:#fafafa; border:1px solid #e5e7eb; border-radius:12px; padding:16px;">
                <div style="display:flex; justify-content:space-between; flex-wrap:wrap; margin-bottom:12px;">
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#dc2626; margin-bottom:4px;">Número de pedido</div>
                    <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">#ORD-2024-00123</div>
                  </div>
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#dc2626; margin-bottom:4px;">Fecha del pedido</div>
                    <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">15 de marzo, 2024</div>
                  </div>
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#dc2626; margin-bottom:4px;">Estado actual</div>
                    <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#ef4444;">Cancelado</div>
                  </div>
                </div>
                
                <div style="margin-top:12px; padding-top:12px; border-top:1px dashed #e5e7eb;">
                  <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:8px;">📬 Dirección registrada:</div>
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
              <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:16px;">Productos del pedido cancelado</div>
              
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
                    <td><span style="color:#ef4444; font-weight:600;">❌ Cancelado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Mouse Inalámbrico</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">Color Negro • Recargable</div>
                    </td>
                    <td>2</td>
                    <td><span style="color:#ef4444; font-weight:600;">❌ Cancelado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Teclado Mecánico</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">Switch Red • RGB</div>
                    </td>
                    <td>1</td>
                    <td><span style="color:#ef4444; font-weight:600;">❌ Cancelado</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Funda para Laptop</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">15.6" • Color Gris</div>
                    </td>
                    <td>1</td>
                    <td><span style="color:#ef4444; font-weight:600;">❌ Cancelado</span></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Refund Information -->
          <tr>
            <td style="padding:6px 32px 20px 32px;">
              <div class="order-summary">
                <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:16px;">Información de reembolso</div>
                
                <div class="order-summary-row">
                  <span style="font:400 14px/1.4 'Segoe UI',Arial,sans-serif; color:#475569;">Monto total del pedido:</span>
                  <span style="font:600 14px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">$31,761.60 MXN</span>
                </div>
                
                <div class="order-summary-row">
                  <span style="font:400 14px/1.4 'Segoe UI',Arial,sans-serif; color:#475569;">Método de pago original:</span>
                  <span style="font:600 14px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Tarjeta de crédito terminada en 1234</span>
                </div>
                
                <div class="order-summary-row order-total">
                  <span style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Monto a reembolsar:</span>
                  <span style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#059669;">$31,761.60 MXN</span>
                </div>
                
                <div style="margin-top:16px; padding-top:16px; border-top:1px dashed #cbd5e1;">
                  <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:8px;">📋 Proceso de reembolso:</div>
                  <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#475569;">
                    • El reembolso se procesará automáticamente<br/>
                    • Tiempo estimado: 3-10 días hábiles<br/>
                    • El dinero aparecerá en tu estado de cuenta original<br/>
                    • Recibirás un correo de confirmación cuando se complete
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:6px;">🔄 ¿Qué puedes hacer ahora?</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#475569;">
                  1. <b>Espera el reembolso</b> en tu cuenta (3-10 días hábiles)<br/>
                  2. <b>Explora alternativas</b> si buscas productos similares<br/>
                  3. <b>Contáctanos</b> si tienes preguntas sobre el proceso<br/>
                  4. <b>Revisa nuestra tienda</b> para futuras compras
                </div>
              </div>
            </td>
          </tr>

          <!-- Alternative Options -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#059669; margin-bottom:6px;">💡 Alternativas disponibles</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#065f46;">
                  ¿Sigues interesado en productos similares? Te recomendamos:<br/>
                  • <b>Laptop Gaming Elite</b> - Especificaciones similares, disponible<br/>
                  • <b>Mouse Gamer Pro</b> - Versión mejorada, en stock<br/>
                  • <b>Teclado RGB Premium</b> - Nueva generación, inmediato
                </div>
              </div>
            </td>
          </tr>

          <!-- CTA Buttons -->
          <tr>
            <td align="center" style="padding:10px 32px 20px;">
              <a class="btn" href="https://tu-dominio.com/tienda/laptops-gaming" 
                 style="display:inline-block; background:#ef4444; color:#ffffff; text-decoration:none; font:700 15px/1 'Segoe UI',Arial,sans-serif; padding:14px 26px; border-radius:10px; box-shadow:0 6px 16px rgba(239,68,68,.35); margin:0 8px 10px;">
                Ver alternativas
              </a>
              <a href="https://tu-dominio.com/ayuda/reembolsos" 
                 style="display:inline-block; background:#ffffff; color:#ef4444; text-decoration:none; font:700 15px/1 'Segoe UI',Arial,sans-serif; padding:14px 26px; border-radius:10px; border:2px solid #ef4444; margin:0 8px 10px;">
                Preguntas sobre reembolsos
              </a>
            </td>
          </tr>

          <!-- Support Section -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0369a1; margin-bottom:6px;">¿Necesitas más información?</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#0369a1;">
                  • <b>Estado del reembolso:</b> <a href="mailto:reembolsos@tu-dominio.com" style="color:#ef4444; text-decoration:none;">reembolsos@tu-dominio.com</a><br/>
                  • <b>Atención al cliente:</b> <a href="tel:+525512345678" style="color:#ef4444; text-decoration:none;">+52 55 1234 5678</a><br/>
                  • <b>Horario:</b> Lunes a Viernes de 9:00 AM a 6:00 PM
                </div>
              </div>
            </td>
          </tr>

          <!-- Apology Message -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#fefce8; border:1px solid #fef08a; border-radius:12px; padding:16px; text-align:center;">
                <div style="font:italic 14px/1.6 'Segoe UI',Arial,sans-serif; color:#854d0e;">
                  Lamentamos cualquier inconveniente que esta cancelación pueda causarte. 
                  Valoramos tu confianza y esperamos poder servirte nuevamente en el futuro.
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
              <a href="https://tu-dominio.com/ayuda" style="font:600 13px/1 'Segoe UI',Arial,sans-serif; color:#ef4444; text-decoration:none;">Centro de ayuda</a>
              <span style="color:#cbd5e1; margin:0 8px;">•</span>
              <a href="https://tu-dominio.com/contacto" style="font:600 13px/1 'Segoe UI',Arial,sans-serif; color:#ef4444; text-decoration:none;">Contáctanos</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 28px 28px; background:#ffffff; text-align:center;">
              <p style="margin:0 0 8px; font:400 12px/1.6 'Segoe UI',Arial,sans-serif; color:#64748b;">
                Este es un correo automático de notificación de cancelación de pedido.
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