/* ==========================================================================
   LÓGICA DE INTERFAZ DEL QUIZ
   ========================================================================== */

// Función para el botón "Iniciar Quiz"
// Oculta la intro y muestra el contenedor donde irán las preguntas
function iniciarQuizUI() {
    console.log("Botón Iniciar Quiz pulsado");

    // 1. Ocultar la pantalla de introducción
    const intro = document.getElementById('intro-quiz');
    if (intro) {
        intro.classList.add('oculto');
    }

    // 2. Mostrar la pantalla del juego (donde saldrán las preguntas)
    const juego = document.getElementById('juego-quiz');
    if (juego) {
        juego.classList.remove('oculto');
    }

    // Aquí abajo añadiremos más adelante la llamada a cargarPreguntas()
    console.log("Pantalla de juego visible. Listo para cargar preguntas.");
}