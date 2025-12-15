// Preguntas
const preguntasCI = [
    { pregunta: "El tiburón ballena es el pez más grande del mundo.", correcto: true },
    { pregunta: "Los delfines son peces.", correcto: false },
    { pregunta: "Los pulpos tienen tres corazones.", correcto: true },
    { pregunta: "Los peces payaso cambian de sexo varias veces en su vida.", correcto: true },
    { pregunta: "Las medusas son peces.", correcto: false }
];

let indicePregunta = 0;
const preguntaEl = document.getElementById("ci-pregunta");
const feedbackEl = document.getElementById("ci-feedback");
const btnCorrecto = document.getElementById("btn-correcto");
const btnIncorrecto = document.getElementById("btn-incorrecto");

function mostrarPregunta() {
    const preguntaActual = preguntasCI[indicePregunta];
    preguntaEl.textContent = preguntaActual.pregunta;
    feedbackEl.textContent = "";
}

btnCorrecto.addEventListener("click", () => verificar(true));
btnIncorrecto.addEventListener("click", () => verificar(false));

function verificar(respuestaUsuario) {
    const correcta = preguntasCI[indicePregunta].correcto;
    if (respuestaUsuario === correcta) {
        feedbackEl.textContent = "¡Correcto!";
    } else {
        feedbackEl.textContent = "Incorrecto";
    }
    // Pasar a la siguiente pregunta tras 1.5s
    indicePregunta++;
    if (indicePregunta >= preguntasCI.length) {
        setTimeout(() => {
            preguntaEl.textContent = "¡Has completado todas las preguntas!";
            feedbackEl.textContent = "";
            indicePregunta = 0; // Reinicio opcional
        }, 1500);
    } else {
        setTimeout(mostrarPregunta, 1500);
    }
}

// Inicializar
mostrarPregunta();
