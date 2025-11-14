function MostrarTodos() {
    let animales = document.querySelectorAll('#contenedor-animales > div');
    for (let i = 0; i < animales.length; i++) {
        let animal = animales[i];
        animal.style.display = 'block'; //Muestra el elemento
    }
}
function OcultarTodos() {
    // Selecciona todos los divs descendientes del padre "contenedor-animales""
    let todosLosAnimales = document.querySelectorAll('#contenedor-animales > div');

    for (let i = 0; i < todosLosAnimales.length; i++) {
        let animal = todosLosAnimales[i];
        animal.style.display = 'none';         // Oculta el elemento.
    }
}
function FiltrarOviparos() {
    OcultarTodos();
    let animales_oviparos = document.querySelectorAll('.oviparo'); // Selecciono todos los elementos que tengan clase "oviparo" > Para clases uso el punto.
                                                                                                                              //> Para id uso el #.
    for (let i = 0; i < animales_oviparos.length; i++) {
        let animal = animales_oviparos[i];
        animal.style.display = 'block';
    }
}

function FiltrarMamiferos(){
    OcultarTodos();
    let animales_mamiferos = document.querySelectorAll('.mamifero'); // Selecciono todos los elementos que tengan clase "mamifero"
    for (let i = 0; i < animales_mamiferos.length; i++) {
        let animal = animales_mamiferos[i];
        animal.style.display = 'block';
    }
}

//document.addEventListener('DOMContentLoaded', MostrarTodos);