import express from "express";
import tiendaEnLinea from "./routes/Routes.js"
import db from "./config/db.js";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());

// Conectar a la base de datos
db();
    
    const dominiosPermitidos = [
        "http://localhost:5173",
        "http://159.89.183.121"
    ];

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

    app.use(cors(corsOptions));
    app.use('/tienda/api', tiendaEnLinea);
    app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Establer puerto de la API
app.listen(3001, () => {
    console.log("El servidor esta funcionando desde puerto 3001");
});