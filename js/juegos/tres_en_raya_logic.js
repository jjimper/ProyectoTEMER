
/**
  Author:       M.Moreno
  Date:         Dec.25
  Description:  Lógica de juego para 3 en raya.
**/

/* ==========================================================================
   VARIABLES GLOBALES DEL JUEGO
========================================================================== */
const jugadorHumano = 'X'; 
const jugadorIA = 'O';     
let turnoActual = 'X';    
let tablero = ["", "", "", "", "", "", "", "", ""]; // Estado del tablero vacio
let juegoActivo = false;  

const condicionesVictoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

/* ==========================================================================
   SECCIÓN 1: NAVEGACIÓN
========================================================================== */
/** Gestiona la transición de la pantalla de inicio al tablero de juego */
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

/* ==========================================================================
   SECCIÓN 2: LÓGICA PRINCIPAL DEL JUEGO
========================================================================== */
/** Reinicia variables, limpia el tablero y resetea la interfaz */
function iniciarLogicaJuego() {
    turnoActual = jugadorHumano; 
    tablero = ["", "", "", "", "", "", "", "", ""]; 
    juegoActivo = true;  
    eliminarGlobos();

    const textoTurno = document.getElementById("jugador-actual");
    if (textoTurno) {
        textoTurno.textContent = "X (Tú)";
    }

    const mensajeEstado = document.getElementById("mensaje-estado");
    if (mensajeEstado) {
        mensajeEstado.textContent = "";      
        mensajeEstado.classList.add("oculto"); 
        mensajeEstado.style.color = "";     
    }

    const celdas = document.querySelectorAll('.celda');
    celdas.forEach(celda => {
        celda.innerHTML = "";
        celda.style.color = ""; 
        celda.classList.remove("ganadora");
    });

    //console.log("Juego reiniciado correctamente.");
}

/** Gestiona la interacción del usuario al hacer clic en una celda */
function clickCelda(evento) {
    if(!juegoActivo || turnoActual !== jugadorHumano) return;

    const celda = evento.target;
    const indice = parseInt(celda.getAttribute('data-index'));

    if (tablero[indice] !== "") return;

    hacerMovimiento(celda, indice, jugadorHumano);

    if (!verificarEstadoJuego()) {
       cambiarTurno();
   };
}

/** Actualiza el estado lógico y visual de una celda específica */
function hacerMovimiento(celda, indice, jugador) {
    tablero[indice] = jugador;

    if (jugador === 'X') {
    
        celda.innerHTML = '<img src="../img/estrella.png" alt="Estrella">';
        celda.style.color = ""; 
    } else {
        celda.textContent = jugador;
        celda.innerHTML = '<img src="../img/concha.png" alt="Estrella">';
        celda.style.color = ""; 
    }
}

/** Alterna el turno entre humano e IA*/
function cambiarTurno() {
    turnoActual = (turnoActual === 'X') ? 'O' : 'X';

    const textoTurno = document.getElementById("jugador-actual");

    if (turnoActual === jugadorHumano) {
            textoTurno.textContent = "X (Tú)";
        } else {
            textoTurno.textContent = "O (Pensando...)";

            if (juegoActivo) {
                setTimeout(movimientoIA, 600);
            }
        }
}

/* ==========================================================================
   SECCIÓN 3: VERIFICACIÓN DE VICTORIA
========================================================================== */

/** Evalúa si hay un ganador, un empate o si el juego continúa */
function verificarEstadoJuego() {
    let rondaGanada = false;
    let combinacionGanadora = [];

    for (let i = 0; i < condicionesVictoria.length; i++) {
        const [a, b, c] = condicionesVictoria[i];
        const valA = tablero[a];
        const valB = tablero[b];
        const valC = tablero[c];

        if (valA === "" || valB === "" || valC === "") continue;

        if (valA === valB && valB === valC) {
            rondaGanada = true;
            combinacionGanadora = [a, b, c];
            break;
        }
    }

    if (rondaGanada) {
        finalizarPartida(turnoActual, combinacionGanadora);
        return true;
    }

    if (!tablero.includes("")) {
        finalizarPartida("Empate", []);
        return true;
    }

    return false;
}

/** Detiene el juego, muestra el resultado final y efectos visuales */
function finalizarPartida(ganador, combinacion) {
    juegoActivo = false;
    const mensajeEstado = document.getElementById("mensaje-estado");
    const textoTurno = document.getElementById("jugador-actual");
    if(textoTurno) textoTurno.textContent = "-";

    if (mensajeEstado) {
        mensajeEstado.classList.remove("oculto");
        
        if (ganador === jugadorHumano) {
            mensajeEstado.textContent = "¡Felicidades! ¡Has ganado!";
            mensajeEstado.style.color = "#28a745"; 
            lanzarCelebracionGlobos(); 
        } else if (ganador === jugadorIA) {
            mensajeEstado.textContent = "¡La IA ha ganado! Inténtalo de nuevo.";
            mensajeEstado.style.color = "#e74c3c"; 
        } else {
            mensajeEstado.textContent = "¡Es un empate!";
            mensajeEstado.style.color = "#0077be"; 
        }
    }

    combinacion.forEach(indice => {
        const celda = document.querySelector(`.celda[data-index='${indice}']`);
        if (celda) celda.classList.add("ganadora");
    });
}

/* ==========================================================================
   SECCIÓN 4: INTELIGENCIA ARTIFICIAL
========================================================================== */
/** Determina y ejecuta el movimiento de la IA según la dificultad */
function movimientoIA() {
    if (!juegoActivo) return;
    
    const dificultadSelect = document.getElementById('dificultad');
    const nivel = dificultadSelect ? dificultadSelect.value : 'medio';

    let indiceElegido;

    if (nivel === 'facil') {
        indiceElegido = obtenerMovimientoAleatorio();
    }
    else if (nivel === 'medio') {
        if (Math.random() > 0.4) {
            indiceElegido = obtenerMejorMovimiento(); 
        } else {
            indiceElegido = obtenerMovimientoAleatorio();
        }
    }
    else {
        indiceElegido = obtenerMejorMovimiento();
    }

    if (indiceElegido === undefined) return;
    
    const celdaDOM = document.querySelector(`.celda[data-index='${indiceElegido}']`);
    if (celdaDOM) {
        hacerMovimiento(celdaDOM, indiceElegido, jugadorIA);

        if (!verificarEstadoJuego()) {
            cambiarTurno();
        }
    }
}

// --- FUNCIONES AUXILIARES IA ---
/** Devuelve un índice disponible aleatorio en el tablero */
function obtenerMovimientoAleatorio() {

    let celdasDisponibles = [];

    tablero.forEach((valor, indice) => {
        if (valor === "") celdasDisponibles.push(indice);
    });

    if (celdasDisponibles.length === 0) return undefined;

    const random = Math.floor(Math.random() * celdasDisponibles.length);
    return celdasDisponibles[random];
}

/** Calcula la jugada óptima: ganar, bloquear o centro */
function obtenerMejorMovimiento() {
    
    //Movimiento ataque de IA
    let movimiento = buscarJugadaCritica(jugadorIA);
    if (movimiento !== null) return movimiento;

    //Movimiento defensa contra humano
    movimiento = buscarJugadaCritica(jugadorHumano);
    if (movimiento !== null) return movimiento;

    //Estrategia centro
    if (tablero[4] === "") return 4;
    
    // Se evaluan todas las situaciones y si no hay ninguna peligrosa, coloca al azar
    return obtenerMovimientoAleatorio();
}

/** Identifica celdas para ganar o bloquear una victoria inminente */
function buscarJugadaCritica(jugadorObjetivo) {
    for (let i = 0; i < condicionesVictoria.length; i++) {
        const [a, b, c] = condicionesVictoria[i];
        
        //Posibles combinaciones ganadoras (X X null, X null X, null X X)
        if (tablero[a] === jugadorObjetivo && tablero[b] === jugadorObjetivo && tablero[c] === "") return c;
        if (tablero[a] === jugadorObjetivo && tablero[c] === jugadorObjetivo && tablero[b] === "") return b;
        if (tablero[b] === jugadorObjetivo && tablero[c] === jugadorObjetivo && tablero[a] === "") return a;
    }
    return null;
}

/* ==========================================================================
   SECCIÓN 5: EFECTO DE GLOBOS
   ========================================================================== */
/** Genera y anima los elementos visuales de celebración */   
function lanzarCelebracionGlobos() {
    
    //Creamos contenedor para los globos
    let contenedor = document.getElementById('contenedor-globos');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'contenedor-globos';
        document.body.appendChild(contenedor);
    }

    const colores = ['rojo', 'azul', 'verde', 'amarillo', 'naranja'];

    for (let i = 0; i < 50; i++) {
        const globo = document.createElement('div');
        globo.classList.add('globo');
        
        // Color aleatorio
        globo.classList.add(colores[Math.floor(Math.random() * colores.length)]);
        // Posición horizontal aleatoria
        globo.style.left = Math.random() * 100 + 'vw';
        // Velocidad aleatoria 
        globo.style.animationDuration = (Math.random() * 3 + 3) + 's';
        // Tamaño aleatorio
        const tamano = Math.random() * 0.6 + 0.8;
        globo.style.transform = `scale(${tamano})`;

        contenedor.appendChild(globo);
    }
    
    setTimeout(eliminarGlobos, 6000);
}

/** Limpia el contenedor de efectos visuales del DOM */
function eliminarGlobos() {
    const contenedor = document.getElementById('contenedor-globos');
    if (contenedor) {
        contenedor.innerHTML = '';
    }
}

/* ==========================================================================
   INICIALIZACIÓN
========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const celdas = document.querySelectorAll(".celda");
    celdas.forEach(celda => {
        celda.addEventListener("click", clickCelda);
    });
    
    const btnReiniciar = document.getElementById("reiniciar");
    if (btnReiniciar) {
        btnReiniciar.addEventListener("click", iniciarLogicaJuego);
    }
});
