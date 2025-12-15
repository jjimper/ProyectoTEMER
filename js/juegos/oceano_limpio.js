/* ==========================================================================
   LÓGICA DEL JUEGO: MISIÓN LIMPIEZA (PECERA)
   ========================================================================== */

let intervaloJuego;    // Controla el reloj
let intervaloBasura;   // Controla la aparición de basura
let intervaloPeces;    // Controla la aparición de peces
let tiempoRestante = 30;
let puntuacionLimpieza = 0;

const tiposBasura = ["🥤", "🥡", "🥫", "🧴", "🛍️", "👟"];

const imagenesPeces = [
    '../img/pez_payaso.png',
    '../img/pez_azul.png',
    '../img/pez_amarillo.png'
];


function iniciarPeceraUI() {
    
    const intro = document.getElementById('intro-pecera');
    if (intro) intro.classList.add('oculto'); 

    const juego = document.getElementById('juego-pecera');
    if (juego) juego.classList.remove('oculto'); 

    const overlayStart = document.getElementById('overlay-start');
    if (overlayStart) overlayStart.classList.remove('oculto');
    
    document.getElementById('overlay-gameover').classList.add('oculto');
    
    document.getElementById('zona-juego').innerHTML = '';
    
    tiempoRestante = 30;
    puntuacionLimpieza = 0;
    actualizarMarcadores();
}


// 2. BOTÓN START
function arrancarMecanicasPecera() {
    console.log("¡Acuario en movimiento!");
    
    document.getElementById('overlay-start').classList.add('oculto');

    intervaloJuego = setInterval(() => {
        tiempoRestante--;
        actualizarMarcadores();
        
        if (tiempoRestante <= 0) {
            finDelJuegoPecera();
        }
    }, 1000);

    crearPez(); 
    intervaloPeces = setInterval(crearPez, 1000);
}

// 3. GENERADOR DE PECES
function crearPez() {
    const zona = document.getElementById('juego-pecera');
    if (!zona) return;

    const pez = document.createElement('img');
    pez.classList.add('elemento-pez');

    const imagenRandom = imagenesPeces[Math.floor(Math.random() * imagenesPeces.length)];
    pez.src = imagenRandom;

    // Elección aleatoria del formato del pez
    const direccion = Math.random() > 0.5 ? 'derecha' : 'izquierda';
    const posY = Math.random() * (zona.offsetHeight - 100); 
    const duracion = Math.random() * 5 + 5; 
    const tamano = Math.random() * 50 + 70; 


    pez.style.top = posY + 'px';
    pez.style.width = tamano + 'px';
    pez.style.animationDuration = duracion + 's';

    if (direccion === 'derecha') {
        pez.classList.add('nadando-derecha');
        pez.style.left = '-100px'; 
    } else {
        pez.classList.add('nadando-izquierda');
        pez.style.right = '-100px';
    }

    pez.addEventListener('animationend', function() {
        pez.remove();
    });

    document.getElementById('zona-juego').appendChild(pez);
}


// 5. ACTUALIZAR TEXTOS
function actualizarMarcadores() {
    const tiempoElement = document.getElementById('tiempo-pecera');
    const puntosElement = document.getElementById('puntuacion-pecera');

    if (tiempoElement) tiempoElement.textContent = tiempoRestante;
    if (puntosElement) puntosElement.textContent = puntuacionLimpieza;
}

// 6. FIN DEL JUEGO
function finDelJuegoPecera() {
    
    clearInterval(intervaloJuego);
    clearInterval(intervaloBasura);
    clearInterval(intervaloPeces); 
    
    document.getElementById('puntuacion-final-pecera').textContent = puntuacionLimpieza;
    document.getElementById('overlay-gameover').classList.remove('oculto');
}

function reiniciarPecera() {
    iniciarPeceraUI();
}