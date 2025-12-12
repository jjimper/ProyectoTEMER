
/**
  Author:       M.Moreno
  Date:         Dec.25
  Description:  Lógica de juego para 3 en raya.
**/

// Se ejecuta al pulsar "Jugar Ahora" en la tarjeta
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

// Se ejecuta al pulsar "Comenzar Juego" dentro de la intro del 3 en Raya
function iniciarPartidaUI() {
    
    const intro = document.getElementById('intro-juego');
    if (intro) {
        intro.classList.add('oculto');
    }

    // Mostramos el tablero de juego
    const tablero = document.getElementById('tablero-container');
    if (tablero) {
        tablero.classList.remove('oculto');
    }
    
    console.log("Tablero cargado. Aquí irá la lógica del juego más adelante.");
}

// Se ejecuta al pulsar "Volver" o "Salir al menú"
function volverGaleria() {

    const contenedorJuego = document.getElementById('contenedor-juego-3enRaya');
    if (contenedorJuego) {
        contenedorJuego.classList.add('oculto');
    }

    const vistaSeleccion = document.getElementById('vista-seleccion');
    if (vistaSeleccion) {
        vistaSeleccion.classList.remove('oculto');
    }

    // Reset visual
    const introJuego = document.getElementById('intro-juego');
    const tableroContainer = document.getElementById('tablero-container');

    if (introJuego) introJuego.classList.remove('oculto');      
    if (tableroContainer) tableroContainer.classList.add('oculto'); 
}


/***************************************************************************************** */
/**
  Author:       M.Ripoll
  Date:         Dec.25
  Description:  Lógica para Quiz.
**/