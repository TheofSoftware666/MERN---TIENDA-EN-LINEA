DELIMITER //

CREATE FUNCTION add_Carrito (
	usuario INT
) 
RETURNS VARCHAR(100)
DETERMINISTIC
BEGIN
	DECLARE msg VARCHAR(100) DEFAULT '';
    DECLARE existeCarrito INT DEFAULT 0;
    
    -- Verificar si el usuario tiene un carrito activo
    SELECT COUNT(*) INTO existeCarrito
    FROM carrito
    WHERE usuarioId = usuario AND estado != 'finalizado';
    
    IF existeCarrito > 0 THEN
		SET msg = 'Error: Ya existe un carrito.';
        RETURN msg;  -- Devuelve el mensaje en lugar de usar RETURN sin valor
    END IF;

	SELECT * FROM carrito
END;
//
DELIMITER;