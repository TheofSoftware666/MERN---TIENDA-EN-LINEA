SET @carritoID = 0;
SET cantidadStock INT DEFAULT 0;
SET msg VARCHAR(100) DEFAULT '';
SET existeCarrito INT DEFAULT 0;
SET  existeProducto INT DEFAULT 0;

SELECT * FROM CARRITO WHERE id = @carritoID;