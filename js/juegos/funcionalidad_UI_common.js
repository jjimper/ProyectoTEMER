/* ==========================================================================
   SECCIÓN 1: NAVEGACIÓN
========================================================================== */

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

// Se ejecuta al pulsar "Volver" o "Salir al menú"
function volverGaleria() {

    const juegosIds = ['contenedor-juego-3enRaya', 'contenedor-juego-Quiz', 'contenedor-juego-Pecera'];
    juegosIds.forEach(id => {
        const contenedor = document.getElementById(id);
        if (contenedor) contenedor.classList.add('oculto');
    });

    const vistaSeleccion = document.getElementById('vista-seleccion');
    if (vistaSeleccion) {
        vistaSeleccion.classList.remove('oculto');
    }

    // Reset visual 3 en Raya
    const introJuego = document.getElementById('intro-juego');
    const tableroContainer = document.getElementById('tablero-container');

    if (introJuego) introJuego.classList.remove('oculto');      
    if (tableroContainer) tableroContainer.classList.add('oculto'); 

    // Reset visual Quiz marino
    const introQuiz = document.getElementById('intro-quiz');
    const juegoQuiz = document.getElementById('juego-quiz');
    
    if (introQuiz) introQuiz.classList.remove('oculto');
    if (juegoQuiz) juegoQuiz.classList.add('oculto');

    //Reset visual Mision Limpieza
    const introPecera = document.getElementById('intro-pecera');
    const juegoPecera = document.getElementById('juego-pecera');

    if (introPecera) introPecera.classList.remove('oculto');
    if (juegoPecera) juegoPecera.classList.add('oculto');

    juegoActivo = false;
    eliminarGlobos();
}


function eliminarGlobos() {
    const contenedor = document.getElementById('contenedor-globos');
    if (contenedor) {
        contenedor.innerHTML = '';
    }
}