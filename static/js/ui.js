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
const escenarios = [

    {
        titulo: "Mercado Maya",
        descripcion:
            "Aprende cómo pedir comida y hablar en un mercado tradicional maya."
    },

    {
        titulo: "Casa Tradicional",
        descripcion:
            "Aprende conversaciones familiares y palabras del hogar."
    },

    {
        titulo: "Escuela Comunitaria",
        descripcion:
            "Practica frases educativas y vocabulario escolar maya."
    },

    {
        titulo: "Fiesta Tradicional",
        descripcion:
            "Aprende expresiones culturales y celebraciones mayas."
    }

];

function cambiarEscenario(){

    const aleatorio =
        escenarios[
            Math.floor(
                Math.random() * escenarios.length
            )
        ];

    document.getElementById(
        "escenario-titulo"
    ).innerText =
        aleatorio.titulo;

    document.getElementById(
        "escenario-descripcion"
    ).innerText =
        aleatorio.descripcion;
        localStorage.setItem(
    "escenarioActual",
    aleatorio.titulo
);
}

window.addEventListener(
    "DOMContentLoaded",
    cambiarEscenario
);