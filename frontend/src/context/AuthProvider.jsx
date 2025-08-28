import { useState, useEffect, createContext } from "react";
import axios from 'axios';
// import useAuth from "../hooks/useAuth";

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [ cargando, setCargando ] = useState(true);
    const [ Auth, setAuth ] = useState({});

    useEffect(() => {

        const autenticarUsuario = async () => {
            const token = localStorage.getItem('ape_token');

            if(!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            try{
                const url = `http://localhost:3001/tienda/api/Perfil`
                const response = await axios(url, config);

                setAuth(response.data.msg);
            }catch(error){
                console.log(error.response.data.msg);
                setAuth({});
            }

            setCargando(false);

        } 

        autenticarUsuario();
    }, []);

    return(
        <AuthContext.Provider
            value={{
                Auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext