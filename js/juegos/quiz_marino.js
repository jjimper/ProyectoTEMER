/**
  Author:       M.Ripoll
  Date:         Dec.25
  Description:  Lógica de juego para quiz marino
**/
/* ==========================================================================
 BANCO DE PREGUNTAS
========================================================================== */
const bancoPreguntas = [
    // --- ODS 14 y Contaminación ---
    { texto: "¿De qué trata el ODS 14?", opciones: ["Vida Terrestre", "Vida Submarina", "Energía Limpia", "Ciudades Sostenibles"], respuesta: 1 },
    { texto: "¿Qué porcentaje de la superficie de la Tierra es océano?", opciones: ["50%", "30%", "70%", "90%"], respuesta: 2 },
    { texto: "¿Cuál es la mayor fuente de oxígeno del planeta?", opciones: ["Los bosques", "El fitoplancton marino", "La selva amazónica", "Los cultivos"], respuesta: 1 },
    { texto: "¿Cuánto tarda una botella de plástico en degradarse en el mar?", opciones: ["50 años", "100 años", "500 años", "Nunca desaparece del todo"], respuesta: 3 },
    { texto: "¿Qué son los microplásticos?", opciones: ["Fragmentos menores a 5mm", "Bolsas pequeñas", "Bacterias", "Juguetes de plástico"], respuesta: 0 },
    { texto: "¿Qué es una 'Isla de Plástico'?", opciones: ["Una isla turística", "Una acumulación gigante de basura flotante", "Una isla artificial", "Un barco de reciclaje"], respuesta: 1 },
    { texto: "¿Qué efecto tiene el CO2 en el océano?", opciones: ["Lo enfría", "Lo vuelve ácido (acidificación)", "Lo vuelve dulce", "No hace nada"], respuesta: 1 },
    { texto: "¿Qué es la 'pesca fantasma'?", opciones: ["Pesca ilegal", "Historias de miedo", "Redes abandonadas que siguen atrapando peces", "Pescar de noche"], respuesta: 2 },
    { texto: "¿Qué porcentaje del comercio mundial se transporta por mar?", opciones: ["10%", "50%", "Más del 80%", "100%"], respuesta: 2 },
    { texto: "¿Con qué ODS se relaciona principalmente el Turismo Costero?", opciones: ["ODS 1 y 2", "ODS 8 y 12", "ODS 5 y 10", "ODS 4 y 7"], respuesta: 1 },
    { texto: "¿Qué tipo de energía renovable se menciona como 'Energía Oceánica'?", opciones: ["Solar y Nuclear", "Eólica marina y mareomotriz", "Carbón y Gas", "Geotérmica"], respuesta: 1 },
    { texto: "¿Qué instrumento internacional establece el marco legal para la conservación de los océanos?", opciones: ["La Constitución", "El Acuerdo de París", "La CONVEMAR", "El Tratado de Versalles"], respuesta: 2 },
    { texto: "¿Qué porcentaje de zonas marinas y costeras se busca conservar como meta?", opciones: ["Al menos el 10%", "El 50%", "El 100%", "El 2%"], respuesta: 0 },

    // Agenda 2030 y General ---
    {texto: "¿Cuáles son las '5 P' de la Agenda 2030?",opciones: ["Poder, Precio, Pacto, Paz, Planeta", "Personas, Planeta, Prosperidad, Paz, Pacto", "Pan, Peces, Playas, Parques, Puertos", "Política, Policía, Prensa, Partidos, Parlamento"],respuesta: 1},
    {texto: "¿Cuántos países aprobaron originalmente la Agenda 2030 en 2015?",opciones: ["50 países", "100 países", "193 países", "Todos los países del mundo"],respuesta: 2},
    { texto: "¿Cuánto plástico se estima que entra al océano cada año?", opciones: ["1 millón de toneladas", "8 millones de toneladas", "100 kilos", "500 mil toneladas"], respuesta: 1 },
    { texto: "¿Cuántas metas específicas incluye la Agenda 2030 además de los 17 ODS?", opciones: ["50 metas", "100 metas", "169 metas", "20 metas"], respuesta: 2 },
    { texto: "¿Cuál es el lema o principio central de la Agenda 2030?", opciones: ["Ganar dinero rápido", "No dejar a nadie atrás", "El mar es nuestro", "Tecnología para todos"], respuesta: 1 },
    { texto: "¿Qué tres dimensiones del desarrollo cubre la Agenda 2030?", opciones: ["Económica, Social y Ambiental", "Política, Religiosa y Deportiva", "Pasado, Presente y Futuro", "Tierra, Mar y Aire"], respuesta: 0 },
    { texto: "¿Qué actores deben participar para lograr la Agenda 2030?", opciones: ["Solo los gobiernos", "Solo las empresas", "Gobiernos, sociedad civil, sector privado y ciudadanos", "Solo la ONU"], respuesta: 2 },

    // --- Biodiversidad Marina ---
    { texto: "¿Cuál es el animal más grande que ha existido jamás?", opciones: ["Tiranosaurio Rex", "Megalodón", "Ballena Azul", "Calamar Colosal"], respuesta: 2 },
    { texto: "¿Cuántos corazones tiene un pulpo?", opciones: ["Uno", "Dos", "Tres", "Cuatro"], respuesta: 2 },
    { texto: "¿Qué animal marino macho es el que da a luz?", opciones: ["El tiburón", "El caballito de mar", "La estrella de mar", "El pez payaso"], respuesta: 1 },
    { texto: "¿Cuál es el océano más grande?", opciones: ["Atlántico", "Índico", "Ártico", "Pacífico"], respuesta: 3 },
    { texto: "¿Qué animal duerme con un ojo abierto?", opciones: ["El delfín", "La tortuga", "El pulpo", "El cangrejo"], respuesta: 0 },
    { texto: "¿Qué es el krill?", opciones: ["Una ballena pequeña", "Un pequeño crustáceo base de la cadena alimentaria", "Un tipo de alga", "Un pez venenoso"], respuesta: 1 },
    { texto: "¿Cómo se orientan las tortugas marinas?", opciones: ["Por las estrellas", "Por el campo magnético de la Tierra", "Por el olor", "Por la temperatura"], respuesta: 1 },
    { texto: "¿Qué pez vive en simbiosis con la anémona?", opciones: ["Pez globo", "Pez payaso", "Pez espada", "Pez león"], respuesta: 1 },
    
    // --- Geografía y Curiosidades ---
    { texto: "¿Dónde está el punto más profundo del océano?", opciones: ["Fosa de las Marianas", "Triángulo de las Bermudas", "Fosa de Java", "Gran Agujero Azul"], respuesta: 0 },
    { texto: "¿Qué fenómeno provoca las mareas?", opciones: ["El viento", "La rotación de la tierra", "La gravedad de la Luna", "Las olas"], respuesta: 2 },
    { texto: "¿Qué es el blanqueamiento del coral?", opciones: ["Cuando se limpia", "Cuando muere o enferma por estrés térmico", "Cuando nace", "Cuando se camufla"], respuesta: 1 },
    { texto: "¿Qué porcentaje del océano ha sido explorado por humanos?", opciones: ["100%", "50%", "Menos del 20%", "80%"], respuesta: 2 },
    { texto: "¿Qué animal es conocido como el 'unicornio del mar'?", opciones: ["Narval", "Pez espada", "Beluga", "Dugongo"], respuesta: 0 },
    { texto: "¿Qué son los manglares?", opciones: ["Barcos antiguos", "Bosques de árboles tolerantes a la sal en costas", "Tipos de tiburones", "Corrientes marinas"], respuesta: 1 },
    { texto: "¿Cuál es la estructura viva más grande visible desde el espacio?", opciones: ["La Muralla China", "La Gran Barrera de Coral", "El Amazonas", "El Everest"], respuesta: 1 },
    
    // --- Acción y Conservación ---
    { texto: "¿Qué podemos hacer para reducir el plástico en el mar?", opciones: ["Tirar todo al río", "Usar bolsas reutilizables y reciclar", "Quemar la basura", "Nada"], respuesta: 1 },
    { texto: "¿Qué es una Zona Muerta (Dead Zone)?", opciones: ["Donde no hay oxígeno y la vida no prospera", "Un cementerio de barcos", "Una zona sin luz", "Una playa cerrada"], respuesta: 0 },
    { texto: "¿Qué especie está en peligro crítico en el Golfo de California?", opciones: ["La Vaquita Marina", "El Atún", "La Sardina", "El Delfín Nariz de Botella"], respuesta: 0 },
    { texto: "¿Por qué son importantes las praderas de posidonia?", opciones: ["Son bonitas", "Capturan carbono y dan refugio", "Sirven de comida para tiburones", "No sirven para nada"], respuesta: 1 },
    { texto: "¿Qué temperatura necesita el coral para sobrevivir?", opciones: ["Muy fría", "Muy caliente", "Estable y cálida (no excesiva)", "Congelada"], respuesta: 2 },
    { texto: "¿Cuál es el depredador tope del océano?", opciones: ["El tiburón blanco", "La Orca", "El calamar gigante", "La barracuda"], respuesta: 1 },
    { texto: "¿Qué significa ser 'sostenible' con el océano?", opciones: ["Pescar todo lo posible", "Usar recursos sin agotarlos para el futuro", "No entrar al agua", "Construir más hoteles"], respuesta: 1 },

    // --- Sobre otros ODS (1-17) ---
    { texto: "¿Qué define el ODS 1 como pobreza extrema (valor diario)?", opciones: ["Menos de 10$", "Menos de 2,15$", "Menos de 50$", "Menos de 1$"], respuesta: 1 },
    { texto: "¿Qué ODS busca lograr la igualdad de género y empoderar a mujeres y niñas?", opciones: ["ODS 1", "ODS 5", "ODS 9", "ODS 14"], respuesta: 1 },
    { texto: "¿Cuál es el objetivo principal del ODS 13?", opciones: ["Acción por el Clima", "Vida Submarina", "Educación de Calidad", "Fin de la Pobreza"], respuesta: 0 },
    { texto: "¿Qué ODS se centra en 'Alianzas para lograr los objetivos'?", opciones: ["ODS 10", "ODS 17", "ODS 3", "ODS 1"], respuesta: 1 },
];

let preguntasJuego = []; // Aquí guardaremos las 10 seleccionadas
let indicePreguntaActual = 0;
let puntuacion = 0;

// Funcion de selección aleatoria de 10 preguntas
function seleccionarPreguntasAleatorias() {

    let copiaBanco = [...bancoPreguntas];

    copiaBanco.sort(() => Math.random() - 0.5);

    preguntasJuego = copiaBanco.slice(0, 10);

    //console.log("Preguntas seleccionadas para esta partida:", preguntasJuego);
}

/* ==========================================================================
   SECCIÓN 1: NAVEGACIÓN
========================================================================== */
function iniciarQuizUI() {
    console.log("Reiniciando Quiz...");

    // 1. RESETEAR DATOS DE LA PARTIDA
    indicePreguntaActual = 0;
    puntuacion = 0;
    seleccionarPreguntasAleatorias(); 

    const pantallaFinal = document.getElementById('pantalla-final-quiz');
    if (pantallaFinal) pantallaFinal.classList.add('oculto');

    const intro = document.getElementById('intro-quiz');
    if (intro) intro.classList.add('oculto');

    const scoreDiv = document.getElementById('puntuacion-final');
    if (scoreDiv) scoreDiv.textContent = ""; 

    const mensajeFinal = document.getElementById('mensaje-final');
    if (mensajeFinal) mensajeFinal.textContent = "";

    const juego = document.getElementById('juego-quiz');
    if (juego) {
        juego.classList.remove('oculto');
        
        document.getElementById('texto-pregunta').classList.remove('oculto');
        document.getElementById('contenedor-opciones').classList.remove('oculto');
        document.getElementById('contador-preguntas').classList.remove('oculto');
        
        const btnSiguiente = document.getElementById('btn-siguiente-pregunta');
        if (btnSiguiente) {
            btnSiguiente.classList.add('oculto');
            btnSiguiente.textContent = "Siguiente ➡"; 
        }
    }

    mostrarPregunta();
}

/* ==========================================================================
   SECCIÓN 2: LÓGICA DEL JUEGO
   ========================================================================== */
function mostrarPregunta() {
    
    const preguntaActual = preguntasJuego[indicePreguntaActual];
    
    const textoPregunta = document.getElementById('texto-pregunta');
    const contador = document.getElementById('contador-preguntas');
    
    if (textoPregunta) textoPregunta.textContent = preguntaActual.texto;
    if (contador) contador.textContent = `Pregunta ${indicePreguntaActual + 1} de ${preguntasJuego.length}`;

    const contenedorOpciones = document.getElementById('contenedor-opciones');
    if (contenedorOpciones) {
        contenedorOpciones.innerHTML = ''; 

        preguntaActual.opciones.forEach((opcion, index) => {
            const boton = document.createElement('button');
            boton.textContent = opcion;
            boton.classList.add('btn-opcion');
            boton.onclick = () => verificarRespuesta(index, boton);
            contenedorOpciones.appendChild(boton);
        });
    }
}

function verificarRespuesta(indiceElegido, botonClickeado) {
    const preguntaActual = preguntasJuego[indicePreguntaActual];
    const botones = document.querySelectorAll('.btn-opcion');

    botones.forEach(btn => {
        btn.classList.add('bloqueado');
        btn.onclick = null;
    });

    if (indiceElegido === preguntaActual.respuesta) {
        botonClickeado.classList.add('correcto');
        puntuacion++;
    } else {
        botonClickeado.classList.add('incorrecto');
        botones[preguntaActual.respuesta].classList.add('correcto');
    }

    const btnSiguiente = document.getElementById('btn-siguiente-pregunta');
    if (btnSiguiente) {
        if (indicePreguntaActual === preguntasJuego.length - 1) {
            btnSiguiente.textContent = "Ver Resultados 🏆";
        } else {
            btnSiguiente.textContent = "Siguiente Pregunta ➡";
        }
        btnSiguiente.classList.remove('oculto');
    }
}


function siguientePregunta() {
    indicePreguntaActual++;

    if (indicePreguntaActual < preguntasJuego.length) {
        mostrarPregunta();
        document.getElementById('btn-siguiente-pregunta').classList.add('oculto');
    } else {
        mostrarPantallaFinal();
    }
}

function mostrarPantallaFinal() {
    document.getElementById('texto-pregunta').classList.add('oculto');
    document.getElementById('contenedor-opciones').classList.add('oculto');
    document.getElementById('contador-preguntas').classList.add('oculto');
    document.getElementById('btn-siguiente-pregunta').classList.add('oculto');

    const pantallaFinal = document.getElementById('pantalla-final-quiz');
    if (pantallaFinal) pantallaFinal.classList.remove('oculto');

    const scoreDiv = document.getElementById('puntuacion-final');
    if (scoreDiv) scoreDiv.textContent = `${puntuacion} / ${preguntasJuego.length}`;

    const mensaje = document.getElementById('mensaje-final');
    if (mensaje) {
        if (puntuacion === preguntasJuego.length) {
            mensaje.textContent = "¡PERFECTO! 🌊 Eres un guardián del océano.";
        } else if (puntuacion >= preguntasJuego.length / 2) {
            mensaje.textContent = "¡Buen trabajo! 🐟";
        } else {
            mensaje.textContent = "Sigue aprendiendo. ¡El océano te necesita! 🐙";
        }
    }

    guardarPuntuacionEnServidor();
}

function guardarPuntuacionEnServidor() {
    // Pedimos el nombre al usuario
    const nombreUsuario = prompt("¡Quiz terminado! Escribe tu nombre para guardar la nota:");
    
    if (!nombreUsuario) return;

    // Enviamos los datos al servidor
    fetch('/api/guardar-puntuacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombreUsuario,
            puntos: puntuacion,
            juego: "Quiz Marino"
        })
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        alert("✅ " + data.mensaje);
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Hubo un error al conectar con el servidor.");
    });
}