import db from '../config/db.js';

const consultarDevolucion = async (idUsuario, idDevolucion) => {

    const conection = await db();

    const query = `
        SELECT 
            DV.DevolucionID
            , DV.PedidoID
            , US.nombre
            , PR.nombre
            , DV.Cantidad
            , DV.Motivo
            , DV.Estado
            , DV.MetodoResolucion
            , DV.FechaSolicitud
            , DV.FechaResolucion
            , DV.Observaciones
            , DV.MontoReembolso
        FROM Devouciones DV
        LEFT JOIN productos PR 
        ON DV.ProductoID = PR.productoId
        LEFT JOIN usuarios US
        ON DV.UsuarioID = US.usuarioId
        WHERE DV.UsuarioID = ${idUsuario}
        AND DV.DevolucionID = ${idDevolucion}
    `;

    const [ results, fields] = await conection.query(query);

    return results;
}

const consultarDevoluciones = async (idUsuario) => {
     const conection = await db();

    const query = `
        SELECT 
            DV.DevolucionID
            , DV.PedidoID
            , US.nombre
            , PR.nombre
            , DV.Cantidad
            , DV.Motivo
            , DV.Estado
            , DV.MetodoResolucion
            , DV.FechaSolicitud
            , DV.FechaResolucion
            , DV.Observaciones
            , DV.MontoReembolso
        FROM Devouciones DV
        LEFT JOIN productos PR 
        ON DV.ProductoID = PR.productoId
        LEFT JOIN usuarios US
        ON DV.UsuarioID = US.usuarioId
        WHERE DV.UsuarioID = ${idUsuario}
    `;

    const [ results, fields] = await conection.query(query);

    return results;
}

const crearDevolucion = async (idUsuario, objeto) => {
     const conection = await db();

    const query = `
        INSERT INTO Devouciones (
        PedidoID,
        UsuarioID,
        ProductoID,
        Cantidad,
        Motivo,
        MetodoResolucion,
        Observaciones,
        MontoReembolso) 
        VALUES (${objeto.pedido}, ${idUsuario}, 2, 5, 'Producto Dañado', 'Cambio', 'El producto llego con manchas blancas y esta roto de una parte.', 0.00);

    `;

    const [ results, fields] = await conection.query(query);

    return results;
}

export { consultarDevolucion, consultarDevoluciones, crearDevolucion}
