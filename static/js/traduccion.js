async function traducir() {
    const palabra = document.getElementById("palabra").value;

    const respuesta = await fetch("/traducir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            palabra: palabra
        })
    });

    const datos = await respuesta.json();

    document.getElementById("resultado").innerText = datos.resultado;

    document.getElementById("pronunciacion-texto").innerText =
        "Pronunciación: " + datos.pronunciacion;

    document.getElementById("palabra-practica").innerText =
        datos.pronunciacion;

    document.getElementById("calificacion").innerText = "";
    document.getElementById("tip").innerText = "";
    document.getElementById("barra-progreso").style.width = "0%";

    completarMision("Aprende");
}

async function traduccionIA() {
    const palabra = document.getElementById("palabra").value;

    const respuesta = await fetch("/traducir-ia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            palabra: palabra
        })
    });

    const datos = await respuesta.json();

    document.getElementById("resultado").innerText = datos.resultado;

    document.getElementById("pronunciacion-texto").innerText =
        "Traducción generada por IA.";

    document.getElementById("palabra-practica").innerText =
        datos.resultado;

    completarMision("traducción inteligente");
}

function nuevaPalabra() {
    const palabras = [
        "hola",
        "gracias",
        "comida",
        "familia",
        "escuela",
        "amigo",
        "casa",
        "perro"
    ];

    const aleatoria =
        palabras[Math.floor(Math.random() * palabras.length)];

    document.getElementById("palabra").value = aleatoria;

    traducir();
}

const categorias = {
    basico: [
        "hola",
        "gracias",
        "comida",
        "tortilla"
    ],

    animales: [
        "perro",
        "gato",
        "caballo",
        "pollo"
    ],

    familia: [
        "familia",
        "mujer",
        "hombre",
        "niño"
    ],

    escuela: [
        "escuela",
        "libro",
        "trabajo",
        "amigo"
    ]
};

function cargarCategoria(nombre) {
    const lista = categorias[nombre];

    const aleatoria =
        lista[Math.floor(Math.random() * lista.length)];

    document.getElementById("palabra").value = aleatoria;

    traducir();
}