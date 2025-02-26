function MenuCarrito(){

    return (
        <>
          <div class="content-carrito">
            <div class="card-carrito"> 
                <div class="item-carrito header-carrito">
                    <div class="title-carrito">
                        <span>Tu carrito esta vacio</span>
                    </div>
                    <div id="btn-close-carrito" class="btn-carrito-cerrar">
                        <button id="btn-close" class="btn-close">
                            <div class="btn-x x-1"></div>
                            <div class="btn-x x-2"></div>
                            <div class="btn-x x-3"></div>
                        </button>
                    </div>
                </div>
                <div class="item-carrito main-carrito">
                    
                    <div class="carrito-vacio">
                        <div class="item-carrito-vacio img-carrito">
                            <img src="./public/img/carro-vacio.png" alt="Error al cargar la imagen" title="Carrito Vacio" />
                        </div>
                        <div class="item-carrito-vacio">
                            TU CARRITO ESTA VACIO
                        </div>
                    </div>
                </div>
                <div class="item-carrito action-btn">
                <button class="btn-ir-comprar">IR A PRODUCTOS</button>
                </div>
            </div>
        </div>
        </>
    );

}

export default MenuCarrito;