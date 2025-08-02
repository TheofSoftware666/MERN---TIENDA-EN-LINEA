DELIMITER $$

CREATE FUNCTION GenerarPedido(
    idUsuarioCarrito INT,
    Pagado BOOL,
    CuponDescuento VARCHAR(10)
)
RETURNS VARCHAR(100)
DETERMINISTIC
BEGIN
    -- Declaracion de Variables
    DECLARE existeUsuario INT DEFAULT 0;
    DECLARE existeCarrito INT DEFAULT 0;
    DECLARE existeProductosCarrito INT DEFAULT 0;
    DECLARE existeProducto INT DEFAULT 0;
    DECLARE existeCupon INT DEFAULT 0;
    DECLARE cuponUsado INT DEFAULT 0;
    DECLARE cuponDescuento DECIMAL DEFAULT 0;
    DECLARE cuponDisponible INT DEFAULT 0;
    DECLARE idCarritoUsuario INT DEFAULT 0;
    DECLARE cantidadCarritoActual INT DEFAULT 0;
    DECLARE ultimoPedido INT DEFAULT 0;
    DECLARE Subtotal FLOAT DEFAULT 0;
    DECLARE Total FLOAT DEFAULT 0;
    DECLARE msg VARCHAR(100) DEFAULT '';

    -- Verificar si existe el usuario
    SELECT COUNT(*) INTO existeUsuario
    FROM usuarios
    WHERE usuarioId = idUsuarioCarrito;
    
    IF existeUsuario = 0 THEN 
        SET msg = 'Error: Ocurrio un error inesperado al buscar el carrito del usuario.'; 
        RETURN msg;
    END IF;
    
    -- Verificar si existe el carrito con ese producto
    SELECT COUNT(*), id
    INTO existeCarrito, idCarritoUsuario
    FROM carrito
    WHERE usuarioid = idUsuarioCarrito;
    
    IF existeCarrito = 0 THEN
        SET msg = 'Error: Actualmente no cuentas con un carrito, Agrega productos a tu carrito.';
        RETURN msg;
    END IF;

    -- Verificar si el carrito tiene productos
    SELECT COUNT(*) INTO existeProductosCarrito
    FROM carrito_items
    WHERE carrito_id = idCarritoUsuario;
    
    IF existeProductosCarrito = 0 THEN
        SET msg = 'Error: No tienes productos en tu carrito.';
        RETURN msg;
    END IF;
	
    UPDATE carrito_items cd
    JOIN productos p ON cd.producto_id = p.productoId
    SET cd.precio_unitario = CASE 
        WHEN p.fecha_inicio IS NOT NULL AND p.fecha_fin IS NOT NULL AND CURDATE() BETWEEN p.fecha_inicio AND p.fecha_fin THEN 
            p.monto * (1 - p.descuento1 / 100)
        ELSE p.monto
    END
    WHERE cd.carrito_id = idCarritoUsuario;
    
    -- Sumar todo el carrito para obtener el subtotal
    SELECT SUM(cantidad * precio_unitario) 
    INTO Subtotal
    FROM carrito_items 
    WHERE carrito_id = idCarritoUsuario;
        
	IF length(CuponDescuento) > 0 THEN    
        -- Comprobar si existe un cupon de descuento válido
        SELECT COUNT(*), Descuento, MaximoUsos 
        INTO existeCupon, cuponDescuento, cuponDisponible
        FROM Cupones 
        WHERE CodigoCupon = CuponDescuento 
          AND Activo = 'A' 
          AND MaximoUsos > 0
          AND NOW() BETWEEN FechaInicio AND FechaFin
        LIMIT 1;

        -- Comprobar si existe el cupón válido
        IF existeCupon = 0 THEN
            SET msg = 'Error: El cupon ingresado no es válido.';
            RETURN msg;
        END IF;

        -- Comprobar si ya usó el cupón anteriormente
        SELECT COUNT(*) 
        INTO cuponUsado
        FROM CuponesUsados 
        WHERE CuponID = (SELECT CuponID FROM Cupones WHERE CodigoCupon = CuponDescuento LIMIT 1)
          AND UserID = idUsuarioCarrito;

        IF cuponUsado > 0 THEN 
            SET msg = 'Error: El cupon ingresado ya fue usado anteriormente.';
            RETURN msg;
        END IF;

        -- Aplicar el descuento
        SET Total = Subtotal - (Subtotal * (cuponDescuento / 100));
    ELSE 
        SET Total = Subtotal;
    END IF;
    
    -- Comprobar Pago 
    IF Pagado = FALSE THEN
        RETURN 'Falto Pago: Ocurrio un error al procesar el pago. Intente mas tarde';
    END IF;
    
    SELECT MAX(pedidoId) INTO ultimoPedido FROM pedido;
    SET ultimoPedido = ultimoPedido + 1;
    
    -- Generar Pedido y Pedido Detalle
    INSERT INTO Pedido (pedidoId, userId, estatus, subtotal, iva_total, montoTotal) 
    VALUES (ultimoPedido, idUsuarioCarrito, 'P', Subtotal, 0, Total);
    
    INSERT INTO Pedido_detalles (pedidoId, productoId, cantidad, precioUnitario, montoXCantidad, ivaUnitario, descuentoUnitario, totalUbitario, totalPedido)
    SELECT ultimoPedido, producto_id, cantidad, precio_unitario, (precio_unitario * cantidad), 0, 0, precio_unitario, Total 
    FROM carrito_items 
    WHERE carrito_id = idCarritoUsuario; 
    
    -- Actualizar carrito a finalizado
    UPDATE carrito SET estado = 'finalizado' WHERE id = idCarritoUsuario;
     
    -- En caso de que aplique el cupon
    IF existeCupon = 1 THEN
        -- Agregar al log de Cupones
        INSERT INTO CuponesUsados (CuponID, UserID, PedidoID, FechaUso) 
        VALUES (CuponDescuento, idUsuarioCarrito, ultimoPedido, NOW());
    
        -- Actualizar el uso de Cupones
        UPDATE Cupones SET MaximoUsos = cuponDisponible - 1 WHERE CodigoCupon = CuponDescuento AND Activo = 'A';
        SELECT MaximoUsos INTO cuponDisponible FROM Cupones WHERE CodigoCupon = CuponDescuento AND Activo = 'A';
        
        -- Desactivar el cupon
        IF cuponDisponible = 0 THEN
            UPDATE Cupones SET Activo = 'I' WHERE CodigoCupon = CuponDescuento AND Activo = 'A';
        END IF;
    END IF;

    RETURN 'Success: Se pago correctamente';
END $$

DELIMITER ;

SELECT GenerarPedido(4,1,'MARCO21');

  