DELIMITER //



CREATE FUNCTION ActualizarProductoCarrito (
	usuario INT,
    producto INT,
    cantidadActualizar INT
) 
RETURNS VARCHAR(100)
DETERMINISTIC
BEGIN
DECLARE msg VARCHAR(100) DEFAULT '';
     DECLARE existeCarrito INT DEFAULT 0;
     DECLARE existeProducto INT DEFAULT 0;
     DECLARE existeProductoCarrito INT DEFAULT 0;
     DECLARE cantidadCarrito INT DEFAULT 0;
     DECLARE idCarrito INT DEFAULT 0;
     DECLARE stockActual INT DEFAULT 0;
     DECLARE cantidadDiferencia INT DEFAULT 0;
 
     -- Verificar si el usuario tiene un carrito activo
     SELECT COUNT(*), COALESCE(MAX(id), 0) INTO existeCarrito, idCarrito
     FROM carrito
     WHERE usuarioId = usuario AND estado != 'finalizado';
     
     IF existeCarrito = 0 THEN
 		SET msg = 'Error: No existe el carrito.';
         RETURN msg;
     END IF;
 
 	-- Verificar si el producto existe y está activo
     SELECT COUNT(*) INTO existeProducto
     FROM productos
     WHERE productoId = producto AND estatusProducto = 1;
     
     IF existeProducto = 0 THEN
 		SET msg = 'Error: El producto no existe.';
         RETURN msg;
     END IF;
 
     -- Verificar si el producto ya está en el carrito
     SELECT COUNT(*), COALESCE(MAX(cantidad), 0) INTO existeProductoCarrito, cantidadCarrito
     FROM carrito_items
     WHERE carrito_id = idCarrito AND producto_id = producto;
 	
 	-- Verificar la cantidad de stock actual
     SELECT stock INTO stockActual FROM productos WHERE productoId = producto;
     
     -- VALIDAR STOCK
     IF cantidadActualizar > stockActual THEN
 		SET msg = 'Error: No hay stock disponible';
         RETURN msg;
     END IF;
     
     IF cantidadCarrito != cantidadActualizar THEN
		SET cantidadDiferencia = ABS(cantidadCarrito - cantidadActualizar);

		IF cantidadCarrito > cantidadActualizar THEN
			-- El usuario quitó productos del carrito: hay que devolverlos al stock
			SET stockActual = stockActual + cantidadDiferencia;
		ELSE
			-- El usuario agregó más productos al carrito: hay que restarlos del stock
			SET stockActual = stockActual - cantidadDiferencia;
		END IF;

		UPDATE productos
		SET stock = stockActual
		WHERE productoId = producto AND estatusProducto = 1;
	END IF;
     
     IF existeProductoCarrito > 0 THEN
         -- Actualizar la cantidad del producto
         UPDATE carrito_items
         SET cantidad = cantidadActualizar
         WHERE carrito_id = idCarrito AND producto_id = producto;
 
         SET msg = 'Success: Cantidad actualizada en el carrito';
         RETURN msg;
     ELSE
         -- Insertar el producto por primera vez
         INSERT INTO carrito_items (carrito_id, producto_id, cantidad) 
         VALUES (idCarrito, producto, cantidadActualizar);
 
         SET msg = 'Success: Producto añadido al carrito';
         RETURN msg;
     END IF;
END;
//

DELIMITER ;

-- SELECT ActualizarProductoCarrito(4, 1, 3);

-- SELECT * FROM carrito_items

-- SELECT * FROM productos





