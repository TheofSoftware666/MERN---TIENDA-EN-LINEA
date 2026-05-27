export const sendMailNewOrder = () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>¡Confirmación de tu Pedido!</title>
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
    .order-summary { background:#f1f5f9; border:1px solid #e2e8f0; border-radius:12px; padding:16px; margin:16px 0; }
    .order-summary-row { display:flex; justify-content:space-between; margin-bottom:8px; }
    .order-total { border-top:2px solid #cbd5e1; padding-top:12px; margin-top:12px; font-weight:700; color:#0f172a; }
    .tracking-info { background:#f0f9ff; border:1px solid #bae6fd; border-radius:12px; padding:16px; margin:16px 0; }
    .status-timeline { display:flex; justify-content:space-between; margin-top:20px; position:relative; }
    .status-timeline::before { content:''; position:absolute; top:12px; left:0; right:0; height:2px; background:#e2e8f0; z-index:1; }
    .status-step { position:relative; z-index:2; text-align:center; flex:1; }
    .status-dot { width:26px; height:26px; background:#ffffff; border:2px solid #0ea5e9; border-radius:50%; margin:0 auto 8px; display:flex; align-items:center; justify-content:center; }
    .status-active .status-dot { background:#0ea5e9; }
    .status-label { font:600 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; }
  </style>
</head>
<body style="margin:0; padding:0; background:#0f172a;">
  <div class="preheader">
    Confirmación de pedido #ORD-2024-00123 - Tu compra ha sido procesada exitosamente
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
                    <span style="font:600 12px/1 'Segoe UI',Arial,sans-serif; color:rgba(255,255,255,.85); letter-spacing:.5px;">CONFIRMACIÓN DE PEDIDO</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title & lead -->
          <tr>
            <td class="px" style="padding:28px 32px 6px 32px;">
              <h1 class="h1" style="margin:0 0 8px; font:700 26px/1.25 'Segoe UI',Arial,sans-serif; color:#0f172a;">
                ¡Tu pedido ha sido confirmado! 🎉
              </h1>
              <p class="lead" style="margin:0; font:400 16px/1.6 'Segoe UI',Arial,sans-serif; color:#334155;">
                Hola <b>María</b>, gracias por tu compra. Hemos recibido tu pedido y estamos preparándolo para enviártelo.
              </p>
            </td>
          </tr>

          <!-- Order Status Timeline -->
          <tr>
            <td style="padding:20px 32px 10px 32px;">
              <div class="status-timeline">
                <div class="status-step status-active">
                  <div class="status-dot"></div>
                  <div class="status-label">Pedido<br/>Confirmado</div>
                </div>
                <div class="status-step">
                  <div class="status-dot"></div>
                  <div class="status-label">En<br/>Preparación</div>
                </div>
                <div class="status-step">
                  <div class="status-dot"></div>
                  <div class="status-label">En<br/>Camino</div>
                </div>
                <div class="status-step">
                  <div class="status-dot"></div>
                  <div class="status-label">Entregado</div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Order Info -->
          <tr>
            <td style="padding:6px 32px;">
              <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:16px;">
                <div style="display:flex; justify-content:space-between; flex-wrap:wrap; margin-bottom:12px;">
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#059669; margin-bottom:4px;">Número de pedido</div>
                    <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">#ORD-2024-00123</div>
                  </div>
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#059669; margin-bottom:4px;">Fecha del pedido</div>
                    <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">15 de marzo, 2024</div>
                  </div>
                  <div>
                    <div style="font:600 12px/1.4 'Segoe UI',Arial,sans-serif; color:#059669; margin-bottom:4px;">Estado actual</div>
                    <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#059669;">Confirmado ✓</div>
                  </div>
                </div>
                
                <div style="margin-top:12px; padding-top:12px; border-top:1px dashed #bbf7d0;">
                  <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:8px;">Dirección de envío:</div>
                  <div style="font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569;">
                    María González Rodríguez<br/>
                    Av. Reforma #456, Piso 3<br/>
                    Col. Juárez, Cuauhtémoc<br/>
                    Ciudad de México, 06600<br/>
                    📞 +52 55 1234 5678
                  </div>
                </div>
                
                <div style="margin-top:12px; padding-top:12px; border-top:1px dashed #bbf7d0;">
                  <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:8px;">Método de envío:</div>
                  <div style="font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569;">
                    🚚 Envío Express - Entrega en 24-48 horas<br/>
                    <span style="font-size:12px; color:#64748b;">Fecha estimada de entrega: 17 de marzo, 2024</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:6px;">🔄 ¿Qué sigue?</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#475569;">
                  1. <b>Preparación:</b> Estamos preparando tu pedido (1-2 días hábiles)<br/>
                  2. <b>Envío:</b> Recibirás un correo con el número de seguimiento<br/>
                  3. <b>Entrega:</b> Nuestro repartidor te contactará para coordinar
                </div>
              </div>
            </td>
          </tr>

          <!-- Product Details -->
          <tr>
            <td style="padding:20px 32px 6px 32px;">
              <div style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:16px;">Resumen de tu compra</div>
              
              <table class="product-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Laptop Gaming Pro</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">RTX 4070 • 16GB RAM • 1TB SSD</div>
                    </td>
                    <td>1</td>
                    <td>$25,999.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Mouse Inalámbrico</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">Color Negro • Recargable</div>
                    </td>
                    <td>2</td>
                    <td>$1,798.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Teclado Mecánico</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">Switch Red • RGB</div>
                    </td>
                    <td>1</td>
                    <td>$1,499.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Funda para Laptop</div>
                      <div style="font:400 11px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b; margin-top:2px;">15.6" • Color Gris</div>
                    </td>
                    <td>1</td>
                    <td>$450.00</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding:6px 32px 20px 32px;">
              <div class="order-summary">
                <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:16px;">Resumen del pago</div>
                
                <div class="order-summary-row">
                  <span style="font:400 14px/1.4 'Segoe UI',Arial,sans-serif; color:#475569;">Subtotal (4 productos):</span>
                  <span style="font:600 14px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">$29,746.00 MXN</span>
                </div>
                
                <div class="order-summary-row">
                  <span style="font:400 14px/1.4 'Segoe UI',Arial,sans-serif; color:#475569;">Envío Express:</span>
                  <span style="font:600 14px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">$199.00 MXN</span>
                </div>
                
                <div class="order-summary-row">
                  <span style="font:400 14px/1.4 'Segoe UI',Arial,sans-serif; color:#475569;">Descuento TECH10:</span>
                  <span style="font:600 14px/1.4 'Segoe UI',Arial,sans-serif; color:#059669;">-$2,974.60 MXN</span>
                </div>
                
                <div class="order-summary-row order-total">
                  <span style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Total pagado:</span>
                  <span style="font:700 18px/1.4 'Segoe UI',Arial,sans-serif; color:#059669;">$31,761.60 MXN</span>
                </div>
                
                <div style="margin-top:16px; padding-top:16px; border-top:1px dashed #cbd5e1;">
                  <div class="order-summary-row">
                    <span style="font:400 14px/1.4 'Segoe UI',Arial,sans-serif; color:#475569;">Método de pago:</span>
                    <span style="font:600 14px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Tarjeta de crédito terminada en 1234</span>
                  </div>
                  <div class="order-summary-row" style="margin-top:4px;">
                    <span style="font:400 14px/1.4 'Segoe UI',Arial,sans-serif; color:#475569;">Estado del pago:</span>
                    <span style="font:600 14px/1.4 'Segoe UI',Arial,sans-serif; color:#059669;">Pagado exitosamente ✓</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Customer Notes -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#f3f4f6; border:1px solid #e5e7eb; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a; margin-bottom:6px;">📝 Tus notas:</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#475569;">
                  "Por favor, entregar antes de las 5:00 PM del día de entrega. Si no estoy en casa, dejar con el conserje del edificio. Me gustaría que la laptop venga con Windows 11 Pro preinstalado."
                </div>
                <div style="margin-top:10px; font:400 12px/1.4 'Segoe UI',Arial,sans-serif; color:#64748b;">
                  ✅ Hemos tomado nota de tus instrucciones especiales.
                </div>
              </div>
            </td>
          </tr>

          <!-- CTA Buttons -->
          <tr>
            <td align="center" style="padding:10px 32px 20px;">
              <a class="btn" href="https://tu-dominio.com/mi-cuenta/pedidos/ORD-2024-00123" 
                 style="display:inline-block; background:#059669; color:#ffffff; text-decoration:none; font:700 15px/1 'Segoe UI',Arial,sans-serif; padding:14px 26px; border-radius:10px; box-shadow:0 6px 16px rgba(5,150,105,.35); margin:0 8px 10px;">
                Ver detalles de mi pedido
              </a>
              <a href="https://tu-dominio.com/tienda" 
                 style="display:inline-block; background:#ffffff; color:#059669; text-decoration:none; font:700 15px/1 'Segoe UI',Arial,sans-serif; padding:14px 26px; border-radius:10px; border:2px solid #059669; margin:0 8px 10px;">
                Seguir comprando
              </a>
            </td>
          </tr>

          <!-- Help Section -->
          <tr>
            <td style="padding:6px 32px 18px 32px;">
              <div style="background:#fefce8; border:1px solid #fef08a; border-radius:12px; padding:14px;">
                <div style="font:700 13px/1.4 'Segoe UI',Arial,sans-serif; color:#854d0e; margin-bottom:6px;">💡 ¿Necesitas ayuda?</div>
                <div style="font:400 13px/1.6 'Segoe UI',Arial,sans-serif; color:#854d0e;">
                  • <b>Soporte:</b> <a href="mailto:soporte@tu-dominio.com" style="color:#059669; text-decoration:none;">soporte@tu-dominio.com</a><br/>
                  • <b>Teléfono:</b> <a href="tel:+525512345678" style="color:#059669; text-decoration:none;">+52 55 1234 5678</a> (Lunes a Viernes 9am-6pm)<br/>
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
              <a href="https://tu-dominio.com/ayuda" style="font:600 13px/1 'Segoe UI',Arial,sans-serif; color:#059669; text-decoration:none;">Centro de ayuda</a>
              <span style="color:#cbd5e1; margin:0 8px;">•</span>
              <a href="https://tu-dominio.com/contacto" style="font:600 13px/1 'Segoe UI',Arial,sans-serif; color:#059669; text-decoration:none;">Contáctanos</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 28px 28px; background:#ffffff; text-align:center;">
              <p style="margin:0 0 8px; font:400 12px/1.6 'Segoe UI',Arial,sans-serif; color:#64748b;">
                Este es un correo automático de confirmación. No respondas a este mensaje.
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

// <!-- Tracking Info -->
//           <tr>
//             <td style="padding:6px 32px;">
//               <div class="tracking-info">
//                 <div style="font:700 16px/1.4 'Segoe UI',Arial,sans-serif; color:#0369a1; margin-bottom:12px;">📦 Seguimiento de tu pedido</div>
//                 <div style="font:400 14px/1.5 'Segoe UI',Arial,sans-serif; color:#475569;">
//                   Tu número de seguimiento estará disponible una vez que tu pedido sea enviado. Recibirás un correo con el enlace de seguimiento y actualizaciones en cada etapa.
//                 </div>
//                 <div style="margin-top:12px; padding:12px; background:#ffffff; border-radius:8px; border:1px solid #dbeafe;">
//                   <div style="font:600 13px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">Tu pedido incluye:</div>
//                   <div style="font:400 13px/1.5 'Segoe UI',Arial,sans-serif; color:#475569; margin-top:6px;">
//                     • Garantía de 1 año en todos los productos<br/>
//                     • Soporte técnico gratuito por 6 meses<br/>
//                     • Factura electrónica incluida
//                   </div>
//                 </div>
//               </div>
//             </td>
//           </tr>

// <div class="order-summary-row">
//   <span style="font:400 14px/1.4 'Segoe UI',Arial,sans-serif; color:#475569;">IVA (16%):</span>
//   <span style="font:600 14px/1.4 'Segoe UI',Arial,sans-serif; color:#0f172a;">$4,791.20 MXN</span>
// </div>