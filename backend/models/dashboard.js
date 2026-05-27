import db from "../config/db.js";

const buildDateFilter = (column, time) => {
    switch (time) {
        case "30days":
            return `${column} >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)`;

        case "7days":
            return `${column} >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`;

        case "month":
            return `MONTH(${column}) = MONTH(CURDATE()) AND YEAR(${column}) = YEAR(CURDATE())`;

        case "year":
            return `YEAR(${column}) = YEAR(CURDATE())`;

        default:
            return "1=1";
    }
};

const GetMetricsOverViewModel = async (time) => {
    const response = {
        success: false,
        titleMessage: "Error al obtener las métricas",  
        message: "Ocurrio un error al intentar obtener las métricas del dashboard. Por favor, intenta nuevamente más tarde.",
        data: null
    };
    
    const conditionOrders = buildDateFilter("CreatedAt", time);
    const conditionReturns = buildDateFilter("created_at", time);
    const connection = await db();
    try{
        // const query = `
        //     SELECT JSON_OBJECT(
        //         'TotalIncome', (
        //             SELECT 
        //                 IFNULL(SUM(GrandTotal), 0)
        //             FROM Orders
        //             WHERE Status NOT IN('cancelled')
        //             ORDER BY OrderId
        //         ),
        //         'TotalOrders', (
        //             SELECT 
        //                 COUNT(*) 
        //             FROM Orders
        //             WHERE Status NOT IN('cancelled')
        //         ),
        //         'TotalReturns', (
        //             SELECT 
        //                 COUNT(*) 
        //             FROM returns 
        //         ),
        //         'TotalProducts' , (
        //             SELECT 
        //                 COUNT(*) 
        //             FROM productos 
        //         ),
        //         'TotalUsers', (
        //             SELECT 
        //                 COUNT(*)
        //             FROM usuarios
        //             WHERE correoValidado = 'T'
        //             AND usuarioAdmin != 1
        //         )
        //     ) AS kpis
        // `;

        const query = `
    SELECT JSON_OBJECT(
        'TotalIncome', (
            SELECT 
                IFNULL(SUM(GrandTotal), 0)
            FROM Orders
            WHERE Status NOT IN('cancelled')
            AND ${conditionOrders}
        ),
        'TotalOrders', (
            SELECT 
                COUNT(*) 
            FROM Orders
            WHERE Status NOT IN('cancelled')
            AND ${conditionOrders}
        ),
        'TotalReturns', (
            SELECT 
                COUNT(*) 
            FROM returns 
            WHERE ${conditionReturns}
        ),
        'TotalProducts' , (
            SELECT 
                COUNT(*) 
            FROM productos 
        ),
        'TotalUsers', (
            SELECT 
                COUNT(*)
            FROM usuarios
            WHERE correoValidado = 'T'
            AND usuarioAdmin != 1
        )
    ) AS kpis
`;

        const [results, fields] = await connection.query(query);
        
        if(results.length > 0){
            response.success = true;
            response.titleMessage = "Métricas obtenidas con éxito";
            response.message = "Las métricas del dashboard se han obtenido correctamente.";
            response.data = results[0];
        }
        return response;
    }catch(ex){
        response.success = false;
        response.titleMessage = "Error al obtener las métricas";
        response.message = "Ocurrio un error al intentar obtener las métricas del dashboard. Por favor, intenta nuevamente más tarde.";
        return response;
    }finally{
        if(connection){
            await connection.end().catch(err => console.error("Error cerrando conexión:", err));
        }
    }
};

const GetOrderIncomesModel = async () => {
    const response = {
        success: false,
        titleMessage: "Error al obtener las métricas",  
        message: "Ocurrio un error al intentar obtener las métricas del dashboard. Por favor, intenta nuevamente más tarde.",
        data: null
    };

    const connection = await db();
    try{
        const query = `
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'mes', t.mes_nombre,
                    'total', t.total,
                    'target', t.target
                )
            ) AS revenueData
            FROM (
                SELECT 
                    m.mes_num,
                    m.mes_nombre,
                    IFNULL(SUM(o.GrandTotal), 0) AS total,
                    m.target
                FROM (
                    SELECT 1 mes_num, 'Ene' mes_nombre, 0 target UNION
                    SELECT 2, 'Feb', 40000 UNION
                    SELECT 3, 'Mar', 42000 UNION
                    SELECT 4, 'Abr', 44000 UNION
                    SELECT 5, 'May', 48000 UNION
                    SELECT 6, 'Jun', 50000 UNION
                    SELECT 7, 'Jul', 55000 UNION
                    SELECT 8, 'Ago', 58000 UNION
                    SELECT 9, 'Sep', 62000 UNION
                    SELECT 10, 'Oct', 65000 UNION
                    SELECT 11, 'Nov', 70000 UNION
                    SELECT 12, 'Dic', 80000
                ) m
                LEFT JOIN Orders o 
                    ON MONTH(o.CreatedAt) = m.mes_num
                    AND o.PaymentStatus = 'paid'
                    AND o.Status NOT IN ('cancelled')
                    -- AND o.CreatedAt >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
                    AND YEAR(o.CreatedAt) = YEAR(CURDATE())
                GROUP BY m.mes_num, m.mes_nombre, m.target
                ORDER BY m.mes_num
            ) t;
        `;

        const [results, fields] = await connection.query(query);
        
        if(results.length > 0){
            response.success = true;
            response.titleMessage = "Métricas obtenidas con éxito";
            response.message = "Las métricas del dashboard se han obtenido correctamente.";
            response.data = results[0];
        }
        return response;
    }catch(ex){
        response.success = false;
        response.titleMessage = "Error al obtener las métricas";
        response.message = "Ocurrio un error al intentar obtener las métricas del dashboard. Por favor, intenta nuevamente más tarde.";
        return response;
    }finally{
        if(connection){
            await connection.end().catch(err => console.error("Error cerrando conexión:", err));
        }
    }
};

const GetProductsTopModel = async () => {
    const response = {
        success: false,
        titleMessage: "Error al obtener las métricas",  
        message: "Ocurrio un error al intentar obtener las métricas del dashboard. Por favor, intenta nuevamente más tarde.",
        data: null
    };

    const connection = await db();
    try{
        const query = `
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'name', t.ProductName,
                    'value', t.total_value,
                    'sales', t.total_sales
                )
            ) AS productsData
            FROM (
                SELECT 
                    oi.ProductName,
                    SUM(oi.Total) AS total_value,
                    SUM(oi.Quantity) AS total_sales
                FROM OrderItems oi
                INNER JOIN Orders o 
                    ON o.OrderId = oi.OrderId
                WHERE 
                    o.PaymentStatus = 'paid'
                    AND o.Status NOT IN ('cancelled')
                    AND o.CreatedAt >= DATE_FORMAT(CURDATE(), '%Y-01-01')
                    AND o.CreatedAt < DATE_FORMAT(CURDATE(), '%Y-01-01') + INTERVAL 1 YEAR
                GROUP BY oi.ProductName
                ORDER BY total_value DESC
                LIMIT 5
            ) t;
        `;

        const [results, fields] = await connection.query(query);
        
        if(results.length > 0){
            response.success = true;
            response.titleMessage = "Métricas obtenidas con éxito";
            response.message = "Las métricas del dashboard se han obtenido correctamente.";
            response.data = results[0];
        }
        return response;
    }catch(ex){
        response.success = false;
        response.titleMessage = "Error al obtener las métricas";
        response.message = "Ocurrio un error al intentar obtener las métricas del dashboard. Por favor, intenta nuevamente más tarde.";
        return response;
    }finally{
        if(connection){
            await connection.end().catch(err => console.error("Error cerrando conexión:", err));
        }
    }
};

const GetProductsTopVisitModel = async () => {
    const response = {
        success: false,
        titleMessage: "Error al obtener las métricas",  
        message: "Ocurrio un error al intentar obtener las métricas del dashboard. Por favor, intenta nuevamente más tarde.",
        data: null
    };

    const connection = await db();
    try{
        const query = `
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'name', t.ProductName,
                    'visits', t.total_visits,
                    'lastVisit', t.last_visit
                )
            ) AS productsVisited
            FROM (
                SELECT 
                    p.Nombre AS ProductName, -- ajusta al nombre real de tu columna
                    COUNT(*) AS total_visits,
                    MAX(pv.FechaVisita) AS last_visit
                FROM ProductoVisitas pv
                INNER JOIN productos p 
                    ON p.ProductoId = pv.ProductoId
                WHERE 
                    pv.FechaVisita >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) -- opcional
                GROUP BY pv.ProductoId, p.Nombre
                ORDER BY total_visits DESC, last_visit DESC
                LIMIT 5
            ) t;
        `;

        const [results, fields] = await connection.query(query);
        
        if(results.length > 0){
            response.success = true;
            response.titleMessage = "Métricas obtenidas con éxito";
            response.message = "Las métricas del dashboard se han obtenido correctamente.";
            response.data = results[0];
        }
        return response;
    }catch(ex){
        response.success = false;
        response.titleMessage = "Error al obtener las métricas";
        response.message = "Ocurrio un error al intentar obtener las métricas del dashboard. Por favor, intenta nuevamente más tarde.";
        return response;
    }finally{
        if(connection){
            await connection.end().catch(err => console.error("Error cerrando conexión:", err));
        }
    }
};

const GetOrderStatustModel = async () => {
    const response = {
        success: false,
        titleMessage: "Error al obtener las métricas",  
        message: "Ocurrio un error al intentar obtener las métricas del dashboard. Por favor, intenta nuevamente más tarde.",
        data: null
    };

    const connection = await db();
    try{
        const query = `
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'name', t.name,
                    'value', t.value,
                    'color', t.color
                )
            ) AS ordersStatus
            FROM (
                SELECT 
                    s.name,
                    IFNULL(COUNT(o.OrderId), 0) AS value,
                    s.color,
                    FIELD(s.status, 'delivered','processing','pending','shipped','cancelled','refunded') AS orden
                FROM (
                    SELECT 'pending' status, 'Pendiente' name, '#F59E0B' color UNION ALL
                    SELECT 'processing', 'En Proceso', '#3B82F6' UNION ALL
                    SELECT 'shipped', 'Enviado', '#6366F1' UNION ALL
                    SELECT 'delivered', 'Entregado', '#10B981' UNION ALL
                    SELECT 'cancelled', 'Cancelado', '#EF4444' UNION ALL
                    SELECT 'refunded', 'Reembolsado', '#9CA3AF'
                ) s
                LEFT JOIN Orders o 
                    ON o.Status = s.status
                    AND o.CreatedAt >= DATE_FORMAT(CURDATE(), '%Y-01-01')
                    AND o.CreatedAt < DATE_FORMAT(CURDATE(), '%Y-01-01') + INTERVAL 1 YEAR
                GROUP BY s.status, s.name, s.color
                ORDER BY orden
            ) t;
        `;

        const [results, fields] = await connection.query(query);
        
        if(results.length > 0){
            response.success = true;
            response.titleMessage = "Métricas obtenidas con éxito";
            response.message = "Las métricas del dashboard se han obtenido correctamente.";
            response.data = results[0];
        }
        return response;
    }catch(ex){
        response.success = false;
        response.titleMessage = "Error al obtener las métricas";
        response.message = "Ocurrio un error al intentar obtener las métricas del dashboard. Por favor, intenta nuevamente más tarde.";
        return response;
    }finally{
        if(connection){
            await connection.end().catch(err => console.error("Error cerrando conexión:", err));
        }
    }
};

const GetReturnStatustModel = async () => {
    const response = {
        success: false,
        titleMessage: "Error al obtener las métricas de devoluciones",  
        message: "Ocurrio un error al intentar obtener las métricas de devoluciones del dashboard. Por favor, intenta nuevamente más tarde.",
        data: null
    };

    const connection = await db();
    try{
        const query = `
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'name', t.name,
                    'value', t.value,
                    'color', t.color
                )
            ) AS returnsStatus
            FROM (
                SELECT 
                    s.name,
                    IFNULL(COUNT(o.return_id), 0) AS value,
                    s.color,
                    FIELD(s.status, 'delivered','processing','requested','shipped','cancelled','refunded') AS orden
                FROM (
                    SELECT 'requested' status, 'Requerido' name, '#F59E0B' color UNION ALL
                    SELECT 'processing', 'En Proceso', '#3B82F6' UNION ALL
                    SELECT 'shipped', 'Enviado', '#6366F1' UNION ALL
                    SELECT 'delivered', 'Entregado', '#10B981' UNION ALL
                    SELECT 'cancelled', 'Cancelado', '#EF4444' UNION ALL
                    SELECT 'refunded', 'Reembolsado', '#9CA3AF'
                ) s
                LEFT JOIN returns o 
                    ON o.Status = s.status
                    AND o.Created_at >= DATE_FORMAT(CURDATE(), '%Y-01-01')
                    AND o.Created_at < DATE_FORMAT(CURDATE(), '%Y-01-01') + INTERVAL 1 YEAR
                GROUP BY s.status, s.name, s.color
                ORDER BY orden
            ) t;
        `;

        const [results, fields] = await connection.query(query);
        
        if(results.length > 0){
            response.success = true;
            response.titleMessage = "Métricas de devoluciones obtenidas con éxito";
            response.message = "Las métricas de devoluciones del dashboard se han obtenido correctamente.";
            response.data = results[0];
        }
        return response;
    }catch(ex){
        response.success = false;
        response.titleMessage = "Error al obtener las métricas de devoluciones";
        response.message = "Ocurrio un error al intentar obtener las métricas de devoluciones del dashboard. Por favor, intenta nuevamente más tarde.";
        return response;
    }finally{
        if(connection){
            await connection.end().catch(err => console.error("Error cerrando conexión:", err));
        }
    }
};

export { GetMetricsOverViewModel
    , GetOrderIncomesModel
    , GetProductsTopModel
    , GetProductsTopVisitModel
    , GetOrderStatustModel 
    , GetReturnStatustModel
};