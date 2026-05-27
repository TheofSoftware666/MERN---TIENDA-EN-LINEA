import 'dotenv/config'; 
import express from "express";
import tiendaEnLinea from "./routes/Routes.js"
import db from "./config/db.js";
import cors from "cors";
import path from "path";

import { ProcessPayment } from './controllers/paymentsController.js';

const app = express();

    // Conectar a la base de datos
    db();
    
    const dominiosPermitidos = [
        "http://localhost:5173",
        "http://159.89.183.121",
        "https://shop.demo.altisyscorp.com"
    ];

    app.post('/api/payments/webhook/stripe', 
         express.raw({ type: 'application/json' }), 
    (req, res, next) => {
        // console.log('Body type:', typeof req.body);
        // console.log('Es Buffer:', Buffer.isBuffer(req.body));
        next();
    },
    ProcessPayment
    );

    const corsOptions = {
        origin: function (origin, callback) {
        
        if (!origin) return callback(null, true);

        if (dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    },  
};

    app.use(express.json());        
    app.use(cors(corsOptions));
    app.use('/tienda/api', tiendaEnLinea);
    app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Establer puerto de la API
app.listen(3001, () => {
    console.log("El servidor esta funcionando desde puerto 3001");
});