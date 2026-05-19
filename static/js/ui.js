function actualizarAvatar(puntuacion) {

    const mensajeAvatar =
        document.getElementById(
            "mensaje-avatar"
        );

    const expresion =
        document.getElementById(
            "expresion-avatar"
        );

    if (puntuacion >= 90) {

        mensajeAvatar.innerText =
            "Excelente pronunciación.";

        expresion.innerText = "😄";

    } else if (puntuacion >= 70) {

        mensajeAvatar.innerText =
            "Muy bien. Sigue practicando.";

        expresion.innerText = "🙂";

    } else if (puntuacion >= 50) {

        mensajeAvatar.innerText =
            "Vas mejorando.";

        expresion.innerText = "😐";

    } else {

        mensajeAvatar.innerText =
            "Intentemos nuevamente.";

        expresion.innerText = "😟";
    }

    hablarAvatar(
        mensajeAvatar.innerText
    );
}


function mostrarPantalla(id){

    const pantallas =
        document.querySelectorAll(
            ".pantalla"
        );

    pantallas.forEach(pantalla => {

        pantalla.classList.remove(
            "activa"
        );
    });

    document.getElementById(id)
        .classList.add("activa");
}


const escenarios = [

    {
        titulo:
            "Mercado Maya",

        descripcion:
            "Aprende cómo pedir comida y hablar en un mercado tradicional maya.",

        personaje:
            "👨‍🌾 Vendedor Maya",

        personalidad:
            "Habla como un vendedor amable de mercado maya."
    },

    {
        titulo:
            "Casa Tradicional",

        descripcion:
            "Aprende conversaciones familiares y palabras del hogar.",

        personaje:
            "👵 Abuela Maya",

        personalidad:
            "Habla como una abuela maya sabia y amable."
    },

    {
        titulo:
            "Escuela Comunitaria",

        descripcion:
            "Practica frases educativas y vocabulario escolar maya.",

        personaje:
            "👨‍🏫 Maestro Comunitario",

        personalidad:
            "Habla como un maestro comunitario paciente."
    },

    {
        titulo:
            "Fiesta Tradicional",

        descripcion:
            "Aprende expresiones culturales y celebraciones mayas.",

        personaje:
            "🎉 Joven Maya",

        personalidad:
            "Habla como un joven alegre en una fiesta tradicional maya."
    }

];


function cambiarEscenario(){

    const aleatorio =
        escenarios[
            Math.floor(
                Math.random() *
                escenarios.length
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

    document.getElementById(
        "personaje-escenario"
    ).innerText =
        aleatorio.personaje;

    localStorage.setItem(
        "escenarioActual",
        aleatorio.titulo
    );

    localStorage.setItem(
        "personalidadEscenario",
        aleatorio.personalidad
    );
}


window.addEventListener(
    "DOMContentLoaded",
    cambiarEscenario
); 
function seleccionarEscenario(){

    const seleccionado =
        document.getElementById(
            "selector-escenario"
        ).value;

    const escenario =
        escenarios.find(
            e => e.titulo === seleccionado
        );

    if(!escenario){
        return;
    }

    document.getElementById(
        "escenario-titulo"
    ).innerText =
        escenario.titulo;

    document.getElementById(
        "escenario-descripcion"
    ).innerText =
        escenario.descripcion;

    document.getElementById(
        "personaje-escenario"
    ).innerText =
        escenario.personaje;

    localStorage.setItem(
        "escenarioActual",
        escenario.titulo
    );

    localStorage.setItem(
        "personalidadEscenario",
        escenario.personalidad
    );
}