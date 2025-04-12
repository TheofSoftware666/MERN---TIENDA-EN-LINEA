import { informacionTienda, actualizarTienda } from '../models/tienda.js';
import { comprobarUsuarioAdmin, consultarUsuarioAdmin } from '../models/usuario.js';

const infoTienda = async (req, res) => {
    try{
        const { usuario } = req;
        
        // validar usuario
        const usuarioAdmin = await comprobarUsuarioAdmin(usuario[0].usuarioId);

        if(usuarioAdmin[0].usuarioAdmin == 0){
            const error = new Error("Tienda no encontrada");
            return res.status(404).json({ msg : error.message })
        }

        // Consultar la tienda
        const tienda = await informacionTienda();

        return res.json({ tienda : tienda});

    }catch(e){
        const error = new Error("Tienda no encontrada");
        return res.status(404).json({ msg : error.message })
    }   
}

const ingresarInfoTienda = async (req, res) => {
    try{
        const { tiendaID, name, RFC, telefono, logo, pass, mail } = req.body;

        // Consultar la tienda
        const tienda = await informacionTienda();

        const datos = {
            name : name != tienda[0].name ? name : tienda[0].name,
            RFC : RFC != tienda[0].RFC ? RFC : tienda[0].RFC,
            telefono : telefono != tienda[0].telefono ? telefono : tienda[0].telefono,
            logo : logo != tienda[0].logo ? logo : tienda[0].logo,
            mail : mail != tienda[0].mail ? mail : tienda[0].mail
        }

        await actualizarTienda(tienda[0].tiendaID, datos);

        res.status(200).json({ msg : "Se Actualizo la informacion correctamente"});

    }catch(e){
        console.log(e);
        res.status(400).json({ msg : "Ocurrio un error inesperado"});
    }
}

const actualizarInfoTienda = async (req, res) => {
    try{
        const { tiendaID, name, RFC, telefono, logo, pass, mail } = req.body;

        // Consultar la tienda
        const tienda = await informacionTienda();

        const datos = {
            name : name != tienda[0].name ? name : tienda[0].name,
            RFC : RFC != tienda[0].RFC ? RFC : tienda[0].RFC,
            telefono : telefono != tienda[0].telefono ? telefono : tienda[0].telefono,
            logo : logo != tienda[0].logo ? logo : tienda[0].logo,
            mail : mail != tienda[0].mail ? mail : tienda[0].mail
        }

        await actualizarTienda(tienda[0].tiendaID, datos);

        res.status(200).json({ msg : "Se Actualizo la informacion correctamente"});

    }catch(e){
        console.log(e);
        res.status(400).json({ msg : "Ocurrio un error inesperado"});
    }
}

export { infoTienda, ingresarInfoTienda, actualizarInfoTienda };