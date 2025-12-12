
/**
  Author:       M.Moreno
  Date:         Dec.25
  Description:  Lógica de juego para 3 en raya.
**/

//Variables
const jugadorHumano = 'X'; 
const jugadorIA = 'O';     
let turnoActual = 'X';    
let tablero = ["", "", "", "", "", "", "", "", ""]; // Estado del tablero vacio
let juegoActivo = false;  

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
    
    iniciarLogicaJuego();
}

//Inicializar lógica del juego
function iniciarLogicaJuego() {
    turnoActual = jugadorHumano; 
    tablero = ["", "", "", "", "", "", "", "", ""]; 
    juegoActivo = true;  

    const textoTurno = document.getElementById("jugador-actual");
    if (textoTurno) {
        textoTurno.textContent = "X (Tú)";
    }

    const celdas = document.querySelectorAll('.celda');
    celdas.forEach(celda => {
        celda.innerHTML = "";
        celda.style.color = ""; 
    });

    console.log("Juego iniciado. Turno de X.");
}

//Manejar el click en una celda
function clickCelda(evento) {
    if(!juegoActivo || turnoActual !== jugadorHumano) return;

    const celda = evento.target;
    const indice = parseInt(celda.getAttribute('data-index'));

    if (tablero[indice] !== "") return;

    hacerMovimiento(celda, indice, jugadorHumano);
    cambiarTurno();
}

//Realizar movimiento
function hacerMovimiento(celda, indice, jugador) {
    tablero[indice] = jugador;

    if (jugador === 'X') {
    
        celda.innerHTML = '<img src="../img/estrella.png" alt="Estrella">';
        celda.style.color = ""; 
    } else {
        celda.textContent = jugador;
        celda.style.color = '#e74c3c';
    }
}

//Cambiar turno
function cambiarTurno() {
    turnoActual = (turnoActual === 'X') ? 'O' : 'X';

    const textoTurno = document.getElementById("jugador-actual");

    if (turnoActual === jugadorHumano) {
            textoTurno.textContent = "X (Tú)";
        } else {
            textoTurno.textContent = "O (Pensando...)";
            console.log("Turno de la IA. Esperando lógica...");
        }
}

/* ==========================================================================
   SECCIÓN 3: INICIALIZACIÓN DE EVENTOS
   ========================================================================== */

// Esperamos a que cargue el HTML para asignar los clics a las celdas
document.addEventListener('DOMContentLoaded', () => {
    const celdas = document.querySelectorAll(".celda");
    celdas.forEach(celda => {
        celda.addEventListener("click", clickCelda);
    });
    
    // Opcional: Si el botón reiniciar existe, asignarle función
    const btnReiniciar = document.getElementById("reiniciar");
    if (btnReiniciar) {
        btnReiniciar.addEventListener("click", iniciarLogicaJuego);
    }
});

/***************************************************************************************** */
/**
  Author:       M.Ripoll
  Date:         Dec.25
  Description:  Lógica para Quiz.
**/