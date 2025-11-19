import mysql from 'mysql2/promise';

const db = async () => {
    
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'altisys',
            password : 'gE=TLNa3Xk)U*Vw',
            database : 'altisysecommercedev'
        });

        console.log("Se conecto con la base de datos");
        return connection;

    }catch(error){
        const e = new Error("Error al conectase a la base de datos");            
        console.log("Error al conectar con la base de datos: " + e);
    }
}

export default db;

