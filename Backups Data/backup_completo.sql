-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: tiendaenlinea
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuarioId` int(11) DEFAULT NULL,
  `creado_en` datetime DEFAULT current_timestamp(),
  `actualizado_en` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` varchar(20) DEFAULT 'activo',
  PRIMARY KEY (`id`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`usuarioId`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (3,4,'2025-04-26 06:12:55','2025-04-26 06:47:45','inactivo');
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito_items`
--

DROP TABLE IF EXISTS `carrito_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carrito_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT 1,
  `precio_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carrito_id` (`carrito_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `carrito_items_ibfk_1` FOREIGN KEY (`carrito_id`) REFERENCES `carrito` (`id`) ON DELETE CASCADE,
  CONSTRAINT `carrito_items_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`productoId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_items`
--

LOCK TABLES `carrito_items` WRITE;
/*!40000 ALTER TABLE `carrito_items` DISABLE KEYS */;
INSERT INTO `carrito_items` VALUES (1,3,1,3,0.00),(2,3,3,1,0.00);
/*!40000 ALTER TABLE `carrito_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `categoriaId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`categoriaId`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (4,'AUDIO'),(1,'CAMARAS'),(5,'CELULARES'),(6,'COMPONENTES'),(7,'CONSOLAS'),(3,'ELECTRONICOS'),(10,'MICROFONOS'),(8,'tapetes'),(2,'TECNOLOGIA'),(9,'Vasos');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventario` (
  `idProducto` int(11) NOT NULL,
  `nombreProducto` varchar(50) NOT NULL,
  `monto` double NOT NULL,
  `descuento1` double DEFAULT NULL,
  `descuento2` double DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (1,'Jabon',20,0,0,10),(2,'iPhone 14 Pro',20000,0,0,99),(3,'Shampoo Suero',199,0,0,15);
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marca` (
  `marcaId` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`marcaId`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (2,'ASUS'),(3,'HP'),(1,'MUEBLES PLACENCIA'),(4,'X REAL');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido` (
  `pedidoId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `estatus` char(1) DEFAULT 'P',
  `subtotal` decimal(10,0) DEFAULT NULL,
  `descuento_total` decimal(10,0) DEFAULT NULL,
  `iva_total` decimal(10,0) DEFAULT NULL,
  `montoTotal` decimal(10,0) DEFAULT NULL,
  `fechaCompra` datetime DEFAULT current_timestamp(),
  `fechaEntrega` datetime DEFAULT NULL,
  PRIMARY KEY (`pedidoId`),
  KEY `fk_usuarioId` (`userId`),
  CONSTRAINT `fk_usuarioId` FOREIGN KEY (`userId`) REFERENCES `usuarios` (`usuarioId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,3,'P',12000,2000,1600,11600,'2025-04-16 05:55:38','2024-12-25 00:00:00');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_detalles`
--

DROP TABLE IF EXISTS `pedido_detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido_detalles` (
  `pedidoDetallesId` int(10) NOT NULL AUTO_INCREMENT,
  `pedidoId` int(11) DEFAULT NULL,
  `productoId` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precioUnitario` decimal(10,0) DEFAULT NULL,
  `montoXCantidad` decimal(10,0) DEFAULT NULL,
  `ivaUnitario` decimal(10,0) DEFAULT NULL,
  `descuentoUnitario` decimal(10,0) DEFAULT NULL,
  `totalUbitario` decimal(10,0) DEFAULT NULL,
  `totalPedido` decimal(10,0) DEFAULT NULL,
  `fechaCompra` datetime DEFAULT current_timestamp(),
  `fechaEntrega` datetime DEFAULT NULL,
  PRIMARY KEY (`pedidoDetallesId`),
  KEY `pedidoId` (`pedidoId`),
  KEY `productoId` (`productoId`),
  CONSTRAINT `pedido_detalles_ibfk_1` FOREIGN KEY (`pedidoId`) REFERENCES `pedido` (`pedidoId`),
  CONSTRAINT `pedido_detalles_ibfk_2` FOREIGN KEY (`productoId`) REFERENCES `productos` (`productoId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_detalles`
--

LOCK TABLES `pedido_detalles` WRITE;
/*!40000 ALTER TABLE `pedido_detalles` DISABLE KEYS */;
INSERT INTO `pedido_detalles` VALUES (3,1,3,1,2000,2000,320,0,2320,10000,'2025-04-20 13:54:51','2024-12-25 00:00:00'),(4,1,4,1,7500,7500,1200,0,8700,10000,'2025-04-20 13:54:51','2024-12-25 00:00:00');
/*!40000 ALTER TABLE `pedido_detalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `productoId` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(120) DEFAULT NULL,
  `marcaId` int(11) DEFAULT NULL,
  `categoriaId` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `imagen1` varchar(100) DEFAULT NULL,
  `imagen2` varchar(100) DEFAULT NULL,
  `imagen3` varchar(100) DEFAULT NULL,
  `imagen4` varchar(100) DEFAULT NULL,
  `imagen5` varchar(100) DEFAULT NULL,
  `estatusProducto` bit(1) DEFAULT NULL,
  `estatusPromo` bit(1) DEFAULT NULL,
  `promocion` int(11) DEFAULT NULL,
  `monto` int(11) DEFAULT NULL,
  `descuento1` smallint(6) DEFAULT NULL,
  `descuento2` smallint(6) DEFAULT NULL,
  `iva` bit(1) DEFAULT NULL,
  `vendidos` int(11) DEFAULT NULL,
  PRIMARY KEY (`productoId`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `marcaId` (`marcaId`),
  KEY `categoriaId` (`categoriaId`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`marcaId`) REFERENCES `marca` (`marcaId`),
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`categoriaId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'SALA ESQUINADA','SALA ESQUINADA DE COLOR ROJO  ',1,1,30,'IMAGEN1.png','IMAGEN2.png','IMAGEN3.png','IMAGEN4.png','IMAGEN5.png','','\0',15000,20000,0,0,'',1),(3,'IPHONE PRO MAX','IPHONE 15 PRO MAX',1,1,29,'IMAGEN1.png','IMAGEN2.png','IMAGEN3.png','IMAGEN4.png','IMAGEN5.png','','\0',15000,20000,0,0,'',1),(4,'BOCINA','BOCINA BOSSE',1,1,30,'IMAGEN1.png','IMAGEN2.png','IMAGEN3.png','IMAGEN4.png','IMAGEN5.png','','\0',15000,20000,0,0,'',1),(6,'Bolso de Dama','Bolso de Dama DE COLOR ROJO  ',1,1,30,'Bolso1.png','Bolso2.png','Bolso3.png','Bolso4.png','Bolso5.png','','\0',15000,20000,0,0,'',NULL),(7,'Bolso de Dama C&E','Bolso de Dama DE COLOR NEGRO  ',1,1,30,'BolsoZara1.png','Bolso2.png','Bolso3.png','Bolso4.png','Bolso5.png','','\0',15000,20000,0,0,'',NULL);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tienda`
--

DROP TABLE IF EXISTS `tienda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tienda` (
  `tiendaID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `RFC` varchar(50) DEFAULT NULL,
  `telefono` bigint(20) DEFAULT NULL,
  `logo` varchar(500) DEFAULT NULL,
  `pass` varchar(300) DEFAULT NULL,
  `visitantes` bigint(20) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tiendaID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tienda`
--

LOCK TABLES `tienda` WRITE;
/*!40000 ALTER TABLE `tienda` DISABLE KEYS */;
INSERT INTO `tienda` VALUES (1,'Building Technology','RIV',3320525516,'buildtech','Ma.212204',0,'buildingtechnology@gmail.com');
/*!40000 ALTER TABLE `tienda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `usuarioId` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(60) DEFAULT NULL,
  `pass` varchar(200) DEFAULT NULL,
  `correoValidado` char(1) DEFAULT NULL,
  `token` varchar(60) DEFAULT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `apellido` varchar(20) DEFAULT NULL,
  `direccion` varchar(60) DEFAULT NULL,
  `numeroExterior` varchar(15) DEFAULT NULL,
  `numeroInterior` varchar(15) DEFAULT NULL,
  `cPostal` int(11) DEFAULT NULL,
  `calle1` varchar(60) DEFAULT NULL,
  `calle2` varchar(60) DEFAULT NULL,
  `municipio` varchar(30) DEFAULT NULL,
  `colonia` varchar(30) DEFAULT NULL,
  `estado` varchar(30) DEFAULT NULL,
  `pais` varchar(50) DEFAULT NULL,
  `lada` varchar(10) DEFAULT NULL,
  `celular` bigint(20) DEFAULT NULL,
  `rfc` varchar(80) DEFAULT NULL,
  `razonSocial` varchar(80) DEFAULT NULL,
  `usuarioAdmin` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`usuarioId`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (3,'marcoricovaladez@gmail.com','$2b$10$NRiZYzCSYouvXjFE1nG17.H35u.mDSO3tbm6G4PvYJV/P4xqnIZIy','T','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(4,'esmeralda@gmail.com','$2b$10$P50TIH/T5/3rWpZ3.b3eCOb1npv10Dl43UAjr8S6fSo7LUTH2SWWe','T','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tiendaenlinea'
--
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP FUNCTION IF EXISTS `ActualizarProductoCarrito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `ActualizarProductoCarrito`(usuario INT,
    producto INT,
    cantidadActualizar INT
) RETURNS varchar(100) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP FUNCTION IF EXISTS `add_carrito_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `add_carrito_items`(usuario INT,
    producto INT,
    cantidad INT
) RETURNS varchar(100) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
    DETERMINISTIC
BEGIN
    DECLARE carritoID INT DEFAULT 0;
    DECLARE cantidadStock INT DEFAULT 0;
    DECLARE msg VARCHAR(100) DEFAULT '';
    DECLARE existeCarrito INT DEFAULT 0;
    DECLARE existeProducto INT DEFAULT 0;

    -- Verificar si el usuario tiene un carrito activo
    SELECT COUNT(*) INTO existeCarrito
    FROM carrito
    WHERE usuarioId = usuario AND estado != 'finalizado';

    IF existeCarrito = 0 THEN
        SET msg = 'Error: Aun no has agregado productos a tu carrito.';
        RETURN msg;  -- Devuelve el mensaje en lugar de usar RETURN sin valor
    END IF;

    -- Obtener ID del carrito activo
    SELECT id INTO carritoID FROM carrito WHERE usuarioId = usuario AND estado != 'finalizado' LIMIT 1;

    -- Verificar si el producto existe y está activo
    SELECT COUNT(*) INTO existeProducto
    FROM productos
    WHERE producto_id = producto AND estatusProducto != FALSE;

    IF existeProducto = 0 THEN
        SET msg = 'Error: El producto que quieres agregar no existe.';
        RETURN msg;  -- Devuelve el mensaje en lugar de usar RETURN sin valor
    END IF;

    -- Verificar el stock del producto
    SELECT stock INTO cantidadStock
    FROM productos
    WHERE producto_id = producto AND estatusProducto != FALSE;

    IF cantidad > cantidadStock THEN
        SET msg = 'Error: El producto no cuenta con el stock disponible.';
        RETURN msg;  -- Devuelve el mensaje en lugar de usar RETURN sin valor
    END IF;

    IF cantidad < 1 THEN
        SET msg = 'Error: Ocurrió un error inesperado.';
        RETURN msg;  -- Devuelve el mensaje en lugar de usar RETURN sin valor
    END IF;

    -- Insertar en carrito_items
    INSERT INTO carrito_items (
        carrito_id,
        producto_id,
        cantidad,
        precio_unitario
    )
    VALUES (
        carritoID,
        producto,
        cantidad,
        (SELECT precio_unitario FROM productos WHERE producto_id = producto AND estatusProducto != FALSE)
    );

    SET msg = 'Success: El producto se agregó correctamente.';
    RETURN msg;  -- Devuelve el mensaje final
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP FUNCTION IF EXISTS `agregarProductoCarrito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `agregarProductoCarrito`(usuario INT,
    producto INT
) RETURNS varchar(100) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
    DETERMINISTIC
BEGIN
	DECLARE msg VARCHAR(100) DEFAULT '';
    DECLARE existeCarrito INT DEFAULT 0;
    DECLARE existeProducto INT DEFAULT 0;
    DECLARE existeProductoCarrito INT DEFAULT 0;
    DECLARE cantidadCarrito INT DEFAULT 0;
    DECLARE idCarrito INT DEFAULT 0;
    DECLARE stockActual INT DEFAULT 0;

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
    IF 1 > stockActual THEN
		SET msg = 'Error: No hay stock disponible';
        RETURN msg;
    END IF;
    
    -- Quitar una pieza al stock actual
    SET stockActual = stockActual - 1;
	UPDATE productos SET stock = stockActual WHERE productoId = producto AND estatusProducto = 1;
    
    IF existeProductoCarrito > 0 THEN
        -- Actualizar la cantidad del producto
        UPDATE carrito_items
        SET cantidad = cantidadCarrito + 1
        WHERE carrito_id = idCarrito AND producto_id = producto;

        SET msg = 'Success: Cantidad actualizada en el carrito';
        RETURN msg;
    ELSE
        -- Insertar el producto por primera vez
        INSERT INTO carrito_items (carrito_id, producto_id, cantidad) 
        VALUES (idCarrito, producto, 1);

        SET msg = 'Success: Producto añadido al carrito';
        RETURN msg;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-20  6:07:15
