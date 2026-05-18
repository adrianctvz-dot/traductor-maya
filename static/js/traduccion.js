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
}
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
