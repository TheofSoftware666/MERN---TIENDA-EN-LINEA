import { GetMetricsOverViewModel, GetOrderIncomesModel, GetProductsTopModel, GetProductsTopVisitModel, GetOrderStatustModel, GetReturnStatustModel } from "../models/dashboard.js";
import { checkUserByIdModel } from "./../models/usuario.js";

const GetMetricsOverView = async (req, res) => {
    try{
        const { usuario } = req;
        const { time } = req.query;

        const user = await checkUserByIdModel(usuario);

        if(!user){
            const error = new Error("Usuario no encontrado.");
            return res.status(404).json({ Error : error.message});
        }

        const metrics = await GetMetricsOverViewModel(time ? time : '7days');

        if(!metrics || !metrics.success){
            const error = new Error("No se encontraron métricas para el dashboard.");
            return res.status(404).json({ Error : error.message});
        }

        return res.status(200).json({ success : metrics.success, titleMessage: metrics.titleMessage, message: metrics.message, data: metrics.data });
    }catch(ex){
        const error = new Error("Ocurrió un error al intentar obtener las métricas del dashboard.");
        return res.status(500).json({ Error : error.message });
    }
};

const GetOrderIncomes = async (req, res) => {
    try{
        const { usuario } = req;
        const { time } = req.query;

        const user = await checkUserByIdModel(usuario);

        if(!user){
            const error = new Error("Usuario no encontrado.");
            return res.status(404).json({ Error : error.message});
        }

        const metrics = await GetOrderIncomesModel(time);

        if(!metrics || !metrics.success){
            const error = new Error("No se encontraron métricas para el dashboard.");
            return res.status(404).json({ Error : error.message});
        }

        return res.status(200).json({ success : metrics.success, titleMessage: metrics.titleMessage, message: metrics.message, data: metrics.data });
    }catch(ex){
        const error = new Error("Ocurrió un error al intentar obtener las métricas del dashboard.");
        return res.status(500).json({ Error : error.message });
    }
};

const GetProductsTop = async (req, res) => {
    try{
        const { usuario } = req;
        const { time } = req.query;

        const user = await checkUserByIdModel(usuario);

        if(!user){
            const error = new Error("Usuario no encontrado.");
            return res.status(404).json({ Error : error.message});
        }

        const metrics = await GetProductsTopModel();

        if(!metrics || !metrics.success){
            const error = new Error("No se encontraron métricas para el dashboard.");
            return res.status(404).json({ Error : error.message});
        }

        return res.status(200).json({ success : metrics.success, titleMessage: metrics.titleMessage, message: metrics.message, data: metrics.data });
    }catch(ex){
        const error = new Error("Ocurrió un error al intentar obtener las métricas del dashboard.");
        return res.status(500).json({ Error : error.message });
    }    
};

const GetProductsTopVisit = async (req, res) => {
    try{
        const { usuario } = req;
        const { time } = req.query;
        
        const user = await checkUserByIdModel(usuario);

        if(!user){
            const error = new Error("Usuario no encontrado.");
            return res.status(404).json({ Error : error.message});
        }

        const metrics = await GetProductsTopVisitModel();

        if(!metrics || !metrics.success){
            const error = new Error("No se encontraron métricas para el dashboard.");
            return res.status(404).json({ Error : error.message});
        }

        return res.status(200).json({ success : metrics.success, titleMessage: metrics.titleMessage, message: metrics.message, data: metrics.data });
    }catch(ex){
        const error = new Error("Ocurrió un error al intentar obtener las métricas del dashboard.");
        return res.status(500).json({ Error : error.message });
    }    
};

const GetOrderStatust = async (req, res) => {
    try{
        const { usuario } = req;
        const user = await checkUserByIdModel(usuario);

        if(!user){
            const error = new Error("Usuario no encontrado.");
            return res.status(404).json({ Error : error.message});
        }

        const metrics = await GetOrderStatustModel();

        if(!metrics || !metrics.success){
            const error = new Error("No se encontraron los estados de pedidos para el dashboard.");
            return res.status(404).json({ Error : error.message});
        }

        return res.status(200).json({ success : metrics.success, titleMessage: metrics.titleMessage, message: metrics.message, data: metrics.data });
    }catch(ex){
        const error = new Error("Ocurrió un error al intentar obtener los estados de pedidos para el dashboard.");
        return res.status(500).json({ Error : error.message });
    }    
};

const GetReturnStatust = async (req, res) => {
    try{
        const { usuario } = req;
        const user = await checkUserByIdModel(usuario);

        if(!user){
            const error = new Error("Usuario no encontrado.");
            return res.status(404).json({ Error : error.message});
        }

        const metrics = await GetReturnStatustModel();

        if(!metrics || !metrics.success){
            const error = new Error("No se encontraron los estados de devoluciones para el dashboard.");
            return res.status(404).json({ Error : error.message});
        }

        return res.status(200).json({ success : metrics.success, titleMessage: metrics.titleMessage, message: metrics.message, data: metrics.data });
    }catch(ex){
        const error = new Error("Ocurrió un error al intentar obtener los estados de devoluciones para el dashboard.");
        return res.status(500).json({ Error : error.message });
    }    
};

export { GetMetricsOverView
    , GetOrderIncomes
    , GetProductsTop
    , GetProductsTopVisit
    , GetOrderStatust 
    , GetReturnStatust
};