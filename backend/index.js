import express from "express";
import tiendaEnLinea from "./routes/Routes.js"
import db from "./config/db.js";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());

// Conectar a la base de datos
db();

    // const dominiosPermitidos = ["http://localhost:5173"];
    // const corsOptions = {
    //     origin: function(origin, callback){
    //         if(dominiosPermitidos.indexOf(origin) !== -1){
    //             callback(null, true);
    //         } else {
    //             callback(new Error('No permitido por CORS'));
    //         }
    //     },
    // };
    
    // 🔹 Lista de dominios permitidos
    const dominiosPermitidos = ["http://localhost:5173"];

    // 🔹 Configuración de CORS
    const corsOptions = {
    origin: function (origin, callback) {
        // Si no viene origin (ej: Postman o navegador directo) lo dejamos pasar
        if (!origin) return callback(null, true);

        if (dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
        },  
    };

    app.use(cors(corsOptions));

    // Establecer EndPoint
    app.use('/tienda/api', tiendaEnLinea);

    // 🔹 Hacer pública la carpeta "uploads"
    app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Establer puerto de la API
app.listen(3001, () => {
    console.log("El servidor esta funcionando desde puerto 3001");
});