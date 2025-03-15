import { informacionTienda } from '../models/tienda.js';

const infoTienda = async (req, res) => {

    try{
        // Consultar la tienda
        const tienda = await informacionTienda();

        return res.json({ tienda : tienda});

    }catch(e){
        const error = new Error("Tienda no encontrada");
        return res.status(404).json({ msg : error.message })
    }
    
}

const ingresarInfoTienda = (req, res) => {
    console.log("buscando informacion de la tienda...")
}

const actualizarInfoTienda = (req, res) => {
    console.log("buscando informacion de la tienda...")
}

const eliminarInfoTienda = (req, res) => {
    console.log("buscando informacion de la tienda...")
}

export { infoTienda, ingresarInfoTienda, actualizarInfoTienda, eliminarInfoTienda };