import mysql from 'mysql2/promise';
// import 'dotenv/config'; 

const db = async () => {
    
    try {
        const connection = await mysql.createConnection({
            host: process.env.HostBD,
            user: process.env.UserBD,
            password : process.env.PasswordBD,
            database : process.env.NameBD
        });

        console.log("Se conecto con la base de datos");
        return connection;

    }catch(error){
        const e = new Error("Error al conectase a la base de datos");            
        console.log("Error al conectar con la base de datos: " + e);
    }
}

export default db;

