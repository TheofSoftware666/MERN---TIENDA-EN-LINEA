export const sendMailNewOrderAdminNotification = (orderData) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>¡Nuevo Pedido Recibido! - ${orderData.orderNumber || '#ORD-2024-00123'}</title>
  <style>
    /* Reset */
    * {
      box-sizing: border-box;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    
    body {
      margin: 0;
      padding: 0;
      background: #0f172a;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .preheader {
      display: none !important;
      visibility: hidden;
      opacity: 0;
      color: transparent;
      height: 0;
      width: 0;
      overflow: hidden;
      mso-hide: all;
    }
    
    /* Mobile-first styles */
    @media only screen {
      .container {
        max-width: 600px !important;
        width: 100% !important;
      }
    }
    
    @media screen and (max-width: 640px) {
      .container {
        width: 100% !important;
        border-radius: 12px !important;
      }
      
      .px {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      
      .py {
        padding-top: 20px !important;
        padding-bottom: 20px !important;
      }
      
      .h1 {
        font-size: 24px !important;
        line-height: 1.3 !important;
      }
      
      .lead {
        font-size: 15px !important;
        line-height: 1.5 !important;
      }
      
      .btn {
        padding: 14px 22px !important;
        font-size: 16px !important;
        width: 100% !important;
        text-align: center !important;
      }
      
      .stack {
        display: block !important;
        width: 100% !important;
      }
      
      .stack-table {
        display: block !important;
        width: 100% !important;
      }
      
      .stack-table tr {
        display: block !important;
        width: 100% !important;
        margin-bottom: 12px !important;
        border-bottom: 1px solid #e2e8f0 !important;
        padding-bottom: 12px !important;
      }
      
      .stack-table td {
        display: block !important;
        width: 100% !important;
        text-align: left !important;
        padding: 4px 0 !important;
      }
      
      .stack-table td:first-child {
        font-weight: 600 !important;
        color: #0f172a !important;
      }
      
      .info-grid {
        display: block !important;
      }
      
      .info-grid > div {
        margin-bottom: 16px !important;
        width: 100% !important;
      }
      
      .support-links a {
        display: block !important;
        margin-bottom: 10px !important;
        margin-right: 0 !important;
      }
      
      .product-mobile-card {
        display: block !important;
        background: #f8fafc !important;
        border: 1px solid #e2e8f0 !important;
        border-radius: 10px !important;
        padding: 16px !important;
        margin-bottom: 12px !important;
      }
      
      .mobile-show {
        display: block !important;
      }
      
      .mobile-hide {
        display: none !important;
      }
    }
    
    /* Desktop-only */
    @media screen and (min-width: 641px) {
      .mobile-show {
        display: none !important;
      }
      
      .mobile-hide {
        display: block !important;
      }
    }
    
    /* Table styles */
    .product-table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }
    
    .product-table th {
      background: #f8fafc;
      text-align: left;
      padding: 14px 12px;
      font: 600 13px/1.4 'Segoe UI', Arial, sans-serif;
      color: #0f172a;
      border-bottom: 2px solid #e2e8f0;
    }
    
    .product-table td {
      padding: 14px 12px;
      border-bottom: 1px solid #e2e8f0;
      font: 400 13px/1.5 'Segoe UI', Arial, sans-serif;
      color: #475569;
    }
    
    .product-table tr:last-child td {
      border-bottom: none;
    }
    
    /* Summary styles */
    .order-summary {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
    }
    
    .order-summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      align-items: center;
    }
    
    .order-total {
      border-top: 2px solid #cbd5e1;
      padding-top: 14px;
      margin-top: 14px;
      font-weight: 700;
      color: #0f172a;
    }
    
    /* Badge styles */
    .badge {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 999px;
      font: 700 12px 'Segoe UI', Arial, sans-serif;
      text-align: center;
      min-width: 90px;
    }
    
    .badge-new {
      color: #78350f;
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #b45309 100%);
    }
    
    .badge-paid {
      color: #065f46;
      background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
    }
    
    /* Improve link styles */
    a {
      text-decoration: none;
      transition: all 0.2s ease;
    }
    
    .btn:hover {
      background: #1e293b !important;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
    
    .support-link:hover {
      color: #1e40af !important;
      text-decoration: underline !important;
    }
    
    /* Improve text contrast */
    .text-muted {
      color: #64748b !important;
    }
    
    .text-success {
      color: #059669 !important;
    }
    
    .text-primary {
      color: #1d4ed8 !important;
    }
    
    /* Add spacing utilities */
    .mb-0 { margin-bottom: 0 !important; }
    .mb-2 { margin-bottom: 8px !important; }
    .mb-4 { margin-bottom: 16px !important; }
    .mb-6 { margin-bottom: 24px !important; }
    .mt-2 { margin-top: 8px !important; }
    .mt-4 { margin-top: 16px !important; }
    .mt-6 { margin-top: 24px !important; }
    
    /* Improve visual hierarchy */
    .section-title {
      font: 700 16px/1.4 'Segoe UI', Arial, sans-serif;
      color: #0f172a;
      margin-bottom: 12px;
      position: relative;
      padding-bottom: 8px;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(135deg, #fbbf24 0%, #b45309 100%);
      border-radius: 2px;
    }
  </style>
</head>
<body style="margin:0; padding:0; background:#0f172a; font-family: 'Segoe UI', Arial, sans-serif;">
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
  
  <div class="preheader">
    Nuevo pedido recibido - Orden ${orderData.orderNumber || '#ORD-2024-00123'} por ${orderData.customerName || 'María González'} - Total: ${orderData.totalAmount || '$31,761.60 MXN'}
  </div>

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a; font-family: 'Segoe UI', Arial, sans-serif;">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <!-- Card -->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.18); margin:0 auto;">
          
          <!-- Brand header -->
          <tr>
            <td style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #b45309 100%); padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="${orderData.logoUrl || 'https://tu-dominio.com/logo.png'}" width="120" alt="${orderData.storeName || 'Tu Ecommerce'}" style="display:block; border:0; max-width:120px; height:auto;">
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font:600 12px/1 'Segoe UI', Arial, sans-serif; color:rgba(255,255,255,.95); letter-spacing:.5px; text-transform:uppercase;">NUEVO PEDIDO</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title & lead -->
          <tr>
            <td class="px" style="padding:28px 32px 6px 32px;">
              <h1 class="h1" style="margin:0 0 8px; font:700 26px/1.25 'Segoe UI', Arial, sans-serif; color:#0f172a;">
                ¡Nuevo pedido recibido! 🚀
              </h1>
              <p class="lead" style="margin:0; font:400 16px/1.6 'Segoe UI', Arial, sans-serif; color:#334155;">
                El cliente <b style="color:#0f172a;">${orderData.customerName || 'María González'}</b> ha realizado un nuevo pedido. A continuación, los detalles:
              </p>
            </td>
          </tr>

          <!-- Order Info -->
          <tr>
            <td class="px" style="padding:6px 32px;">
              <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:14px; padding:20px; box-shadow:0 6px 18px rgba(180,83,9,0.1);">

                <!-- Header info - Mobile responsive -->
                <div class="info-grid" style="display:flex; justify-content:space-between; flex-wrap:wrap; margin-bottom:16px; gap:16px;">
                  
                  <div style="flex:1; min-width:150px;">
                    <div style="font:600 12px 'Segoe UI', Arial, sans-serif; color:#b45309; margin-bottom:6px; letter-spacing:0.3px;">
                      NÚMERO DE ORDEN
                    </div>
                    <div style="font:700 18px/1.3 'Segoe UI', Arial, sans-serif; color:#1f2933;">
                      ${orderData.orderNumber || '#ORD-2024-00123'}
                    </div>
                  </div>

                  <div style="flex:1; min-width:150px;">
                    <div style="font:600 12px 'Segoe UI', Arial, sans-serif; color:#b45309; margin-bottom:6px; letter-spacing:0.3px;">
                      FECHA
                    </div>
                    <div style="font:700 16px/1.3 'Segoe UI', Arial, sans-serif; color:#1f2933;">
                      ${orderData.orderDate || '15 de marzo, 2024 - 14:30'}
                    </div>
                  </div>

                  <div style="flex:1; min-width:150px;">
                    <div style="font:600 12px 'Segoe UI', Arial, sans-serif; color:#b45309; margin-bottom:6px; letter-spacing:0.3px;">
                      ESTADO
                    </div>
                    <div class="badge badge-new" style="display:inline-block; padding:6px 14px; border-radius:999px; font:700 13px 'Segoe UI', Arial, sans-serif; color:#78350f; background:linear-gradient(135deg,#fbbf24 0%, #f59e0b 50%, #b45309 100%);">
                      ${orderData.orderStatus || 'Nueva venta'}
                    </div>
                  </div>

                </div>

                <!-- Cliente -->
                <div style="margin-top:20px;">
                  <div class="section-title" style="font:700 14px/1.4 'Segoe UI', Arial, sans-serif; color:#92400e; margin-bottom:8px; position:relative; padding-bottom:6px;">
                    <span style="position:relative; z-index:2; background:#fffbeb; padding-right:8px;">INFORMACIÓN DEL CLIENTE</span>
                    <div style="position:absolute; bottom:0; left:0; width:40px; height:2px; background:#f59e0b; border-radius:1px;"></div>
                  </div>
                  <div style="font:400 14px/1.6 'Segoe UI', Arial, sans-serif; color:#374151;">
                    ${orderData.customerFullName || 'María González Rodríguez'}<br/>
                    ${orderData.customerEmail || 'maria.gonzalez@email.com'}<br/>
                    ${orderData.customerPhone || '+52 55 1234 5678'}
                  </div>
                </div>

                <!-- Dirección -->
                <div style="margin-top:20px;">
                  <div class="section-title" style="font:700 14px/1.4 'Segoe UI', Arial, sans-serif; color:#92400e; margin-bottom:8px; position:relative; padding-bottom:6px;">
                    <span style="position:relative; z-index:2; background:#fffbeb; padding-right:8px;">DIRECCIÓN DE ENVÍO</span>
                    <div style="position:absolute; bottom:0; left:0; width:40px; height:2px; background:#f59e0b; border-radius:1px;"></div>
                  </div>
                  <div style="font:400 14px/1.6 'Segoe UI', Arial, sans-serif; color:#374151;">
                    ${orderData.shippingAddress || 'Av. Reforma #456, Piso 3<br/>Col. Juárez, Cuauhtémoc<br/>Ciudad de México, 06600<br/>Referencias: Entre las calles Havre y Amberes'}
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <!-- Product Details - Desktop -->
          <tr class="mobile-hide">
            <td class="px" style="padding:24px 32px 6px 32px;">
              <div class="section-title" style="font:700 18px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a; margin-bottom:16px; position:relative; padding-bottom:10px;">
                DETALLES DEL PEDIDO
                <div style="position:absolute; bottom:0; left:0; width:60px; height:3px; background:linear-gradient(135deg, #fbbf24 0%, #b45309 100%); border-radius:2px;"></div>
              </div>
              
              <table class="product-table">
                <thead>
                  <tr>
                    <th style="width:45%;">Producto</th>
                    <th style="width:15%; text-align:center;">Cantidad</th>
                    <th style="width:20%; text-align:right;">Precio unitario</th>
                    <th style="width:20%; text-align:right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderData.products ? orderData.products.map(product => `
                  <tr>
                    <td>
                      <div style="font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">${product.name}</div>
                      <div style="font:400 12px/1.4 'Segoe UI', Arial, sans-serif; color:#64748b; margin-top:4px;">${product.details || ''}</div>
                    </td>
                    <td style="text-align:center; font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">${product.quantity}</td>
                    <td style="text-align:right; font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">${product.unitPrice}</td>
                    <td style="text-align:right; font:700 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">${product.subtotal}</td>
                  </tr>
                  `).join('') : `
                  <tr>
                    <td>
                      <div style="font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">Laptop Gaming Pro</div>
                      <div style="font:400 12px/1.4 'Segoe UI', Arial, sans-serif; color:#64748b; margin-top:4px;">Modelo: RTX 4070, 16GB RAM, 1TB SSD</div>
                    </td>
                    <td style="text-align:center; font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">1</td>
                    <td style="text-align:right; font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">$25,999.00 MXN</td>
                    <td style="text-align:right; font:700 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">$25,999.00 MXN</td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">Mouse Inalámbrico</div>
                      <div style="font:400 12px/1.4 'Segoe UI', Arial, sans-serif; color:#64748b; margin-top:4px;">Color: Negro, Recargable</div>
                    </td>
                    <td style="text-align:center; font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">2</td>
                    <td style="text-align:right; font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">$899.00 MXN</td>
                    <td style="text-align:right; font:700 14px/1.4 'Segoe UI', Arial,sans-serif; color:#0f172a;">$1,798.00 MXN</td>
                  </tr>
                  <tr>
                    <td>
                      <div style="font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">Teclado Mecánico</div>
                      <div style="font:400 12px/1.4 'Segoe UI', Arial, sans-serif; color:#64748b; margin-top:4px;">Switch: Red, Retroiluminado RGB</div>
                    </td>
                    <td style="text-align:center; font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">1</td>
                    <td style="text-align:right; font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">$1,499.00 MXN</td>
                    <td style="text-align:right; font:700 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">$1,499.00 MXN</td>
                  </tr>
                  `}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Product Details - Mobile -->
          <tr class="mobile-show">
            <td class="px" style="padding:24px 32px 6px 32px;">
              <div class="section-title" style="font:700 18px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a; margin-bottom:16px;">
                DETALLES DEL PEDIDO
              </div>
              
              <div style="margin-bottom:16px;">
                ${orderData.products ? orderData.products.map(product => `
                <div class="product-mobile-card">
                  <div style="font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a; margin-bottom:6px;">${product.name}</div>
                  <div style="font:400 12px/1.4 'Segoe UI', Arial, sans-serif; color:#64748b; margin-bottom:12px;">${product.details || ''}</div>
                  <div style="display:flex; justify-content:space-between; font:400 13px/1.4 'Segoe UI', Arial, sans-serif; color:#475569;">
                    <span>Cantidad: <strong>${product.quantity}</strong></span>
                    <span>Precio: <strong>${product.unitPrice}</strong></span>
                    <span>Subtotal: <strong>${product.subtotal}</strong></span>
                  </div>
                </div>
                `).join('') : `
                <div class="product-mobile-card">
                  <div style="font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a; margin-bottom:6px;">Laptop Gaming Pro</div>
                  <div style="font:400 12px/1.4 'Segoe UI', Arial, sans-serif; color:#64748b; margin-bottom:12px;">Modelo: RTX 4070, 16GB RAM, 1TB SSD</div>
                  <div style="display:flex; justify-content:space-between; font:400 13px/1.4 'Segoe UI', Arial, sans-serif; color:#475569;">
                    <span>Cantidad: <strong>1</strong></span>
                    <span>Precio: <strong>$25,999.00 MXN</strong></span>
                    <span>Subtotal: <strong>$25,999.00 MXN</strong></span>
                  </div>
                </div>
                <div class="product-mobile-card">
                  <div style="font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a; margin-bottom:6px;">Mouse Inalámbrico</div>
                  <div style="font:400 12px/1.4 'Segoe UI', Arial, sans-serif; color:#64748b; margin-bottom:12px;">Color: Negro, Recargable</div>
                  <div style="display:flex; justify-content:space-between; font:400 13px/1.4 'Segoe UI', Arial, sans-serif; color:#475569;">
                    <span>Cantidad: <strong>2</strong></span>
                    <span>Precio: <strong>$899.00 MXN</strong></span>
                    <span>Subtotal: <strong>$1,798.00 MXN</strong></span>
                  </div>
                </div>
                `}
              </div>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td class="px" style="padding:6px 32px 24px 32px;">
              <div class="order-summary">
                <div class="section-title" style="font:700 16px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a; margin-bottom:16px;">
                  RESUMEN DEL PEDIDO
                </div>
                
                <div class="order-summary-row">
                  <span style="font:400 14px/1.4 'Segoe UI', Arial, sans-serif; color:#475569;">Subtotal:</span>
                  <span style="font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">${orderData.subtotal || '$29,746.00 MXN'}</span>
                </div>
                
                <div class="order-summary-row">
                  <span style="font:400 14px/1.4 'Segoe UI', Arial, sans-serif; color:#475569;">Envío express:</span>
                  <span style="font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">${orderData.shippingCost || '$199.00 MXN'}</span>
                </div>
                
                <div class="order-summary-row">
                  <span style="font:400 14px/1.4 'Segoe UI', Arial, sans-serif; color:#475569;">Descuento ${orderData.discountCode ? `(Código: ${orderData.discountCode})` : ''}:</span>
                  <span style="font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#1d4ed8;">${orderData.discount ? `-${orderData.discount}` : '-$2,974.60 MXN'}</span>
                </div>
                
                <div class="order-summary-row order-total">
                  <span style="font:700 16px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">Total:</span>
                  <span style="font:700 18px/1.4 'Segoe UI', Arial, sans-serif; color:#059669;">${orderData.totalAmount || '$31,761.60 MXN'}</span>
                </div>
                
                <div style="margin-top:20px; padding-top:20px; border-top:1px dashed #cbd5e1;">
                  <div class="order-summary-row">
                    <span style="font:400 14px/1.4 'Segoe UI', Arial, sans-serif; color:#475569;">Método de pago:</span>
                    <span style="font:600 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a;">${orderData.paymentMethod || 'Tarjeta de crédito terminada en 1234'}</span>
                  </div>
                  <div class="order-summary-row" style="margin-top:8px;">
                    <span style="font:400 14px/1.4 'Segoe UI', Arial, sans-serif; color:#475569;">Estado del pago:</span>
                    <span class="badge badge-paid" style="display:inline-block; padding:6px 14px; border-radius:999px; font:700 12px 'Segoe UI', Arial, sans-serif; color:#065f46; background:linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);">
                      ${orderData.paymentStatus || 'Pagado ✓'}
                    </span>
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:10px 32px 24px;">
              <a href="${orderData.adminOrderLink || 'https://admin.tu-dominio.com/orders/abc123def456'}"
                class="btn"
                style="display:inline-block; background:#111827; color:#fbbf24; font:700 15px 'Segoe UI', Arial, sans-serif; padding:16px 32px; border-radius:10px; text-decoration:none; text-align:center; max-width:400px; width:100%;">
                Ver pedido en panel de administración
              </a>
            </td>
          </tr>

          <!-- Notes -->
          ${orderData.customerNotes ? `
          <tr>
            <td class="px" style="padding:6px 32px 18px 32px;">
              <div style="background:#f3f4f6; border:1px solid #e5e7eb; border-radius:12px; padding:18px;">
                <div class="section-title" style="font:700 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a; margin-bottom:8px;">
                  NOTAS DEL CLIENTE
                </div>
                <div style="font:400 14px/1.6 'Segoe UI', Arial, sans-serif; color:#475569; font-style:italic;">
                  "${orderData.customerNotes}"
                </div>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Instructions for Admin -->
          <tr>
            <td class="px" style="padding:6px 32px 18px 32px;">
              <div style="background:#eff6ff; border:1px solid #dbeafe; border-radius:12px; padding:18px;">
                <div class="section-title" style="font:700 14px/1.4 'Segoe UI', Arial, sans-serif; color:#1d4ed8; margin-bottom:8px;">
                  📦 PROCESO DE ENVÍO
                </div>
                <div style="font:400 14px/1.6 'Segoe UI', Arial, sans-serif; color:#1e40af;">
                  1. Ingresar al panel de administración y localizar el pedido correspondiente.<br/>
                  2. Verificar que el producto se encuentre en óptimas condiciones antes del envío.<br/>
                  3. Empacar el producto en una caja adecuada, utilizando material de protección.<br/>
                  4. Entregar a la paquetería y actualizar el estado del pedido.<br/>
                  5. Confirmar la entrega una vez completada.
                </div>
              </div>
            </td>
          </tr>

          <!-- Support Section -->
          <tr>
            <td class="px" style="padding:6px 32px 24px 32px;">
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:20px;">
                
                <div class="section-title" style="font:700 14px/1.4 'Segoe UI', Arial, sans-serif; color:#0f172a; margin-bottom:8px;">
                  ¿TIENES DUDAS SOBRE EL PROCESO?
                </div>

                <div style="font:400 14px/1.6 'Segoe UI', Arial, sans-serif; color:#475569; margin-bottom:16px;">
                  Este ecommerce forma parte de nuestra plataforma en modalidad de renta. Nuestro objetivo es acompañarte 
                  en la operación diaria, por lo que ante cualquier duda sobre procesos, funcionalidades o uso del sistema, 
                  cuentas con recursos de apoyo y atención personalizada.  
                </div>

                <div style="font:400 14px/1.6 'Segoe UI', Arial, sans-serif; color:#334155; margin-bottom:20px;">
                  • 📚 Accede a la documentación y guías en nuestro sitio web<br/>
                  • 🎬 Consulta los videos tutoriales paso a paso<br/>
                  • 👥 Contacta a nuestro equipo de soporte personalizado
                </div>

                <div class="support-links" style="margin-top:20px;">
                  <a href="${orderData.supportLinks?.helpCenter || 'https://tu-dominio.com/soporte'}"
                    class="support-link"
                    style="display:inline-block; font:700 14px 'Segoe UI', Arial, sans-serif; color:#1d4ed8; text-decoration:none; margin-right:20px; margin-bottom:10px;">
                    📚 Centro de ayuda
                  </a>
                  <a href="${orderData.supportLinks?.tutorials || 'https://tu-dominio.com/tutoriales'}"
                    class="support-link"
                    style="display:inline-block; font:700 14px 'Segoe UI', Arial, sans-serif; color:#1d4ed8; text-decoration:none; margin-right:20px; margin-bottom:10px;">
                    🎬 Videos tutoriales
                  </a>
                  <a href="mailto:${orderData.supportEmail || 'soporte@tu-dominio.com'}"
                    class="support-link"
                    style="display:inline-block; font:700 14px 'Segoe UI', Arial, sans-serif; color:#1d4ed8; text-decoration:none; margin-bottom:10px;">
                    👥 Contactar soporte
                  </a>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 28px 32px; background:#ffffff; text-align:center; border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 12px; font:400 13px/1.6 'Segoe UI', Arial, sans-serif; color:#64748b;">
                ⚡ Este es un correo automático generado por el sistema. Por favor, procesa el pedido lo antes posible.
              </p>
              <p style="margin:0 0 16px; font:400 12px/1.6 'Segoe UI', Arial, sans-serif; color:#94a3b8;">
                📍 ${orderData.storeAddress || 'Av. Siempre Viva 123, CDMX, México.'}
              </p>
              <p style="margin:0; font:400 11px/1.6 'Segoe UI', Arial, sans-serif; color:#94a3b8;">
                © ${new Date().getFullYear()} ${orderData.storeName || 'Tu Ecommerce'}. Todos los derechos reservados.
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