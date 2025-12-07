const preguntasQuiz = [
    {
        pregunta: "¿Cuál es el mamífero marino más rápido?",
        opciones: ["Delfín", "Orca", "Foca"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál de estos animales es un invertebrado?",
        opciones: ["Tiburón", "Pulpo", "Ballena"],
        correcta: 1
    },
    {
        pregunta: "¿Qué es un arrecife de coral?",
        opciones: ["Una roca gigante", "Un ecosistema formado por animales coralinos", "Una planta submarina"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál es la función del plancton?",
        opciones: ["Alimentar a los peces", "Hacer oxígeno para humanos", "Limpiar la playa"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál es la característica principal de los peces abisales?",
        opciones: ["Viven en la superficie", "Viven en aguas profundas y oscuras", "Son todos muy grandes"],
        correcta: 1
    }
];

let indiceQuiz = 0;
const quizPreguntaEl = document.getElementById("quiz-pregunta");
const quizOpcionesEl = document.getElementById("quiz-opciones");
const quizFeedbackEl = document.getElementById("quiz-feedback");

function mostrarPreguntaQuiz() {
    const p = preguntasQuiz[indiceQuiz];
    quizPreguntaEl.textContent = p.pregunta;
    quizOpcionesEl.innerHTML = ""; // Limpiar opciones
    quizFeedbackEl.textContent = "";
    p.opciones.forEach((opcion, i) => {
        const btn = document.createElement("button");
        btn.textContent = opcion;
        btn.classList.add("game-btn", "option-btn");
        btn.style.margin = "5px";
        btn.addEventListener("click", () => verificarQuiz(i));
        quizOpcionesEl.appendChild(btn);
    });
}

function verificarQuiz(opcionUsuario) {
    const correcta = preguntasQuiz[indiceQuiz].correcta;
    if (opcionUsuario === correcta) {
        quizFeedbackEl.textContent = "¡Correcto!";
        
    } else {
        quizFeedbackEl.textContent = "Incorrecto";
        
    }
    // Pasar a la siguiente pregunta tras 1.5s
    indiceQuiz++;
    if (indiceQuiz >= preguntasQuiz.length) {
        setTimeout(() => {
            quizPreguntaEl.textContent = "¡Has completado el quiz!";
            quizOpcionesEl.innerHTML = "";
            quizFeedbackEl.textContent = "";
            indiceQuiz = 0; // Reinicio opcional
        }, 1500);
    } else {
        setTimeout(mostrarPreguntaQuiz, 1500);
    }
}

// Inicializar
mostrarPreguntaQuiz();
