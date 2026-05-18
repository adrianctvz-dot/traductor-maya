function actualizarAvatar(puntuacion) {
    const mensajeAvatar = document.getElementById("mensaje-avatar");
    const expresion = document.getElementById("expresion-avatar");

    if (puntuacion >= 90) {
        mensajeAvatar.innerText = "Excelente pronunciación.";
        expresion.innerText = "😄";
    } else if (puntuacion >= 70) {
        mensajeAvatar.innerText = "Muy bien. Sigue practicando.";
        expresion.innerText = "🙂";
    } else if (puntuacion >= 50) {
        mensajeAvatar.innerText = "Vas mejorando.";
        expresion.innerText = "😐";
    } else {
        mensajeAvatar.innerText = "Intentemos nuevamente.";
        expresion.innerText = "😟";
    }

    hablarAvatar(mensajeAvatar.innerText);
}
function mostrarPantalla(id){

    const pantallas =
        document.querySelectorAll(".pantalla");

    pantallas.forEach(pantalla => {
        pantalla.classList.remove("activa");
    });

    document.getElementById(id).classList.add("activa");
}