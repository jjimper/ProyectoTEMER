// Usando const para una función que no se reasignará [cite: 2863]
const cambiarTexto = () => {
    // 1. Seleccionar el elemento dinámico por su ID [cite: 1822]
    let parrafo = document.getElementById('parrafo-dinamico');
    
    // 2. Comprobar su contenido para alternar el estado (lógica simple con if/else) [cite: 1640]
    if (parrafo.textContent === "¡Contenido y estilo cambiados con éxito!") {
        
        // Vuelve al estado original
        parrafo.textContent = "Este párrafo volverá al contenido original.";
        parrafo.style.color = "black"; // Manipulación de estilos con sintaxis JavaScript [cite: 6030]
        parrafo.style.fontSize = "16px";
        
    } else {
        
        // Cambia el contenido y estilo
        parrafo.textContent = "¡Contenido y estilo cambiados con éxito!"; // Manipulación de contenido [cite: 5924]
        parrafo.style.color = "blue"; 
        parrafo.style.fontSize = "24px";
    }
}

// Se puede añadir un escuchador de evento al cargar la página si la función es anónima o una referencia 
// document.addEventListener('DOMContentLoaded', function() {
//     let boton = document.getElementById('boton-interactivo');
//     boton.addEventListener('click', cambiarTexto);
// });