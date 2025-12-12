// Funcion para abrir un juego desde la galería
function abrirJuego(juegoId) {

    const vistaSeleccion = document.getElementById('vista-seleccion');
    if (vistaSeleccion) {
        vistaSeleccion.classList.add('oculto');
    }

    const contenedorJuego = document.getElementById('contenedor-juego-' + juegoId);
    if (contenedorJuego) {
        contenedorJuego.classList.remove('oculto');
    }
}

// Funcion para volver a la galería desde un juego
function volverGaleria() {
    
    const contenedorJuego = document.getElementById('contenedor-juego-3enRaya');
    if (contenedorJuego) contenedorJuego.classList.add('oculto');

    const vistaSeleccion = document.getElementById('vista-seleccion');
    if (vistaSeleccion) {
        vistaSeleccion.classList.remove('oculto');
    }

    //Reset visual
    document.getElementById('intro-juego').classList.remove('oculto');
    document.getElementById('tablero-container').classList.add('oculto');
}
