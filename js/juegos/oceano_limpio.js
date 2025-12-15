/* ==========================================================================
   LÓGICA VISUAL PECERA 
   ========================================================================== */
function iniciarPeceraUI() {
    console.log("Abriendo escenario de la pecera...");

    const intro = document.getElementById('intro-pecera');
    if (intro) intro.classList.add('oculto');
    
    const juego = document.getElementById('juego-pecera');
    if (juego) juego.classList.remove('oculto');

    const overlayStart = document.getElementById('overlay-start');
    const overlayGameOver = document.getElementById('overlay-gameover');

    if (overlayStart) overlayStart.classList.add('oculto');
    if (overlayGameOver) overlayGameOver.classList.add('oculto');

}
