/**
  Author:       M.Moreno
  Date:         Dec.25
  Description:  Lógica pecera
**/
/* ==========================================================================
   LÓGICA DEL JUEGO: MISIÓN LIMPIEZA (PECERA)
   ========================================================================== */

let intervaloJuego;    // Controla el reloj
let intervaloBasura;   // Controla la aparición de basura
let intervaloPeces;    // Controla la aparición de peces
let tiempoRestante = 30;
let puntuacionLimpieza = 0;

let elementoArrastrado = null;
let offsetX = 0;
let offsetY = 0;

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

    const zonaJuego = document.getElementById('juego-pecera');
    zonaJuego.addEventListener('mousemove', moverBasura);
    zonaJuego.addEventListener('mouseup', soltarBasura);
    zonaJuego.addEventListener('mouseleave', soltarBasura); // Si sacas el ratón de la pecera, suelta
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

    crearBasura(); 
    intervaloBasura = setInterval(crearBasura, 1500);

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

// 4. GENERADOR DE BASURA
function crearBasura() {

    const zona = document.getElementById('zona-juego');
    const contenedor = document.getElementById('juego-pecera');
    if (!zona || !contenedor) return;

    const basura = document.createElement('div');
    basura.classList.add('elemento-basura');
    
    const emoji = tiposBasura[Math.floor(Math.random() * tiposBasura.length)];
    basura.textContent = emoji;

    const x = Math.random() * (contenedor.offsetWidth - 50); 
    basura.style.left = x + 'px';
    basura.style.top = '-60px'; 
    const duracionCaida = Math.random() * 4 + 4; 
    
    basura.style.animation = `caerBasura ${duracionCaida}s linear forwards`; //Movimiento del CSS

    basura.addEventListener('mousedown', agarrarBasura);

    basura.addEventListener('animationend', function() {
        basura.remove();
    });

    zona.appendChild(basura);
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

    const zonaJuego = document.getElementById('juego-pecera');
    zonaJuego.removeEventListener('mousemove', moverBasura);
    zonaJuego.removeEventListener('mouseup', soltarBasura);
}

function reiniciarPecera() {
    iniciarPeceraUI();
}

/* ==========================================================================
   LÓGICA DE ARRASTRE (DRAG & DROP)
   ========================================================================== */
function agarrarBasura(e) {
    elementoArrastrado = this;

    const rect = elementoArrastrado.getBoundingClientRect();
    const zonaRect = document.getElementById('juego-pecera').getBoundingClientRect();
    
    // Calculamos desde donde se hace el click (top --> navegador minus top--> borde pecera)
    const posicionRealTop = rect.top - zonaRect.top;
    const posicionRealLeft = rect.left - zonaRect.left;

    elementoArrastrado.style.top = posicionRealTop + 'px';
    elementoArrastrado.style.left = posicionRealLeft + 'px';
    
    // quito animaciones
    elementoArrastrado.style.animation = 'none';   
    elementoArrastrado.style.transition = 'none';  
    
    elementoArrastrado.style.transform = 'rotate(0deg)';

    // Offset de agarre
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    elementoArrastrado.style.zIndex = 100;
    elementoArrastrado.style.cursor = 'grabbing';
}

function moverBasura(e) {
    if (!elementoArrastrado) return;
    e.preventDefault(); 

    const zonaRect = document.getElementById('juego-pecera').getBoundingClientRect();

    let x = e.clientX - zonaRect.left - offsetX;
    let y = e.clientY - zonaRect.top - offsetY;

    elementoArrastrado.style.left = x + 'px';
    elementoArrastrado.style.top = y + 'px';
}

function soltarBasura(e) {
    if (!elementoArrastrado) return;

    const basuraRect = elementoArrastrado.getBoundingClientRect();
    const cubo = document.getElementById('contenedor-reciclaje');
    const cuboRect = cubo.getBoundingClientRect();

    // 1. COMPROBAR SI HA CAÍDO DENTRO DEL CUBO
    const haEntrado = !(
        basuraRect.right < cuboRect.left || 
        basuraRect.left > cuboRect.right || 
        basuraRect.bottom < cuboRect.top || 
        basuraRect.top > cuboRect.bottom
    );

    if (haEntrado) {
        
        puntuacionLimpieza += 1;
        actualizarMarcadores();

        const zonaRect = document.getElementById('juego-pecera').getBoundingClientRect();
        
        const centroCuboX = (cuboRect.left - zonaRect.left) + (cuboRect.width / 2) - (basuraRect.width / 2);
        const centroCuboY = (cuboRect.top - zonaRect.top) + (cuboRect.height / 2) - (basuraRect.height / 2);

        elementoArrastrado.style.transition = 'all 0.3s ease-out';
        elementoArrastrado.style.left = centroCuboX + 'px';
        elementoArrastrado.style.top = centroCuboY + 'px';
        elementoArrastrado.style.transform = 'scale(0.1) rotate(180deg)';
        elementoArrastrado.style.opacity = '0';


        cubo.style.transform = 'scale(1.1)';
        setTimeout(() => cubo.style.transform = 'scale(1)', 200);

        const basuraParaBorrar = elementoArrastrado;
        setTimeout(() => {
            basuraParaBorrar.remove();
        }, 300);

    } else {
      
        
        elementoArrastrado.style.cursor = 'grab';
        elementoArrastrado.style.zIndex = 30;

        const contenedor = document.getElementById('juego-pecera');
        const alturaContenedor = contenedor.offsetHeight; 
        const actualY = parseInt(elementoArrastrado.style.top);
        const destinoY = alturaContenedor + 60; 
        const distancia = destinoY - actualY;
        const tiempoCaida = distancia / 200; 

        elementoArrastrado.style.transition = `top ${tiempoCaida}s linear, transform ${tiempoCaida}s linear`;
        
        const basuraQueCae = elementoArrastrado;
        requestAnimationFrame(() => {
            basuraQueCae.style.top = destinoY + 'px';
            basuraQueCae.style.transform = 'rotate(45deg)'; 
        });

        basuraQueCae.addEventListener('transitionend', function() {
            basuraQueCae.remove();
        });
    }

    elementoArrastrado = null;
}