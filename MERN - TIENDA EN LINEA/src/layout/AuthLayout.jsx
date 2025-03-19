import { Outlet } from "react-router-dom";
import Header from './../components/Header.jsx';

const AuthLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default AuthLayout