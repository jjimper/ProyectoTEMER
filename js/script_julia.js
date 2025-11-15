function OcultarTodos() {
    // Selecciona todos los divs descendientes del padre "contenedor-animales""
    let TodasLasTarjetas = document.querySelectorAll('#contenedor-info > div');

    for (let i = 0; i < TodasLasTarjetas.length; i++) {
        let tarjeta = TodasLasTarjetas[i];
        tarjeta.style.display = 'none';         // Oculta el elemento.
    }
}
function FiltrarAgenda2030() {
    OcultarTodos();
    let tarjetas_Agenda2030 = document.querySelectorAll('.Agenda2030'); // Selecciono todos los elementos que tengan clase "oviparo" > Para clases uso el punto.
                                                                                                                              //> Para id uso el #.
    for (let i = 0; i < tarjetas_Agenda2030.length; i++) {
        let tarjeta_Agenda2030 = tarjetas_Agenda2030[i];
        tarjeta_Agenda2030.style.display = 'block';
    }
}

function FiltrarODS(){
    OcultarTodos();
    let tarjetas_ODS = document.querySelectorAll('.ODS'); // Selecciono todos los elementos que tengan clase "mamifero"
    for (let i = 0; i < tarjetas_ODS.length; i++) {
        let tarjeta_ODS = tarjetas_ODS[i];
        tarjeta_ODS.style.display = 'block';
    }
}

function FiltrarODS14() {
    OcultarTodos();
    let tarjetas_ODS14 = document.querySelectorAll('.ODS14'); // Selecciono todos los elementos que tengan clase "mamifero"
    for (let i = 0; i < tarjetas_ODS14.length; i++) {
        let tarjeta_ODS14 = tarjetas_ODS14[i];
        tarjeta_ODS14.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', FiltrarAgenda2030);
