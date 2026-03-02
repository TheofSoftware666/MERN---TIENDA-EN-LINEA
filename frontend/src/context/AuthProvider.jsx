import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios.jsx";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()
const AuthProvider = ({children}) => {

    const [ cargando, setCargando ] = useState(true);
    const [ Auth, setAuth ] = useState({});
    const navigate = useNavigate();

    useEffect(() => {

        const autenticarUsuario = async () => {
            const token = localStorage.getItem('ape_token');

            // console.log("response");
            if(!token) {
                setCargando(false);
                // navigate('/Auth/inicio-sesion');
                return;
            }

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            try{
                // console.log("rezponse ");
                const response = await clientAxios.get('/GetProfileByUserId', config);
                // console.log(response.data.response.data);
                setAuth(response.data.response.data);
            }catch(error){

                console.log(error.response?.status);
                if(error.response?.status === 401){
                    setAuth({});
                    localStorage.removeItem('ape_token');
                    navigate('/Auth/inicio-sesion');
                    return;
                }
                
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