import { useEffect } from "react";
import './../../public/css/Header.css'

function Header(){

    function handleClick(){
        console.log("Abriendo el contenido del carrito");
    }

    return (
        <>
            <div className="sec-header">
                <div id="btn-menu" className="header-items">
                    <div className="btn-item-menu"></div>
                    <div className="btn-item-menu"></div>
                    <div className="btn-item-menu"></div>                
                </div>
                <div className="header-items titulo-inicio">Building Technology</div>
                <div className="header-items">
                    <form className="form-search navegacion-search" action="" method="post">
                        <input type="text" className="barra-busqueda" name="buscar" placeholder="Buscar componentes" />    
                        <button type="submit" className="btn-buscar" name="submits"><img src="./../public/img/simbolo-de-la-interfaz-de-busqueda.png" alt="Error 404" title="Buscar" /></button>
                    </form>
                </div>
                <div id="contenedorCarrito" onClick={() => handleClick()} className="header-items btn-img"><i className="fa-solid fa-cart-shopping"></i></div>
            </div>
        </>
    );
}

export default Header;