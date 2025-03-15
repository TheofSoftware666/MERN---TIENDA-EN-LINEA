import express from "express";
import tiendaEnLinea from "./routes/Routes.js"
import db from "./config/db.js";

const app = express();
app.use(express.json());

// Conectar a la base de datos
db();

// Establecer EndPoint
app.use('/tienda/api', tiendaEnLinea);

// Establer puerto de la API
app.listen(3001, () => {
    console.log("El servidor esta funcionando desde puerto 3001");
});