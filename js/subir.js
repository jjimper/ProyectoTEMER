document.addEventListener("DOMContentLoaded", () => {

    const boton = document.getElementById("btn-subir");

    // Mostrar / ocultar botón
    window.addEventListener("scroll", function() {
        if (window.scrollY > 200) {
            boton.style.display = "block";
        } else {
            boton.style.display = "none";
        }
    });

    // Acción al hacer clic
    boton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});
