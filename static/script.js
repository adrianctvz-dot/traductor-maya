let xp = 0;
let nivel = 1;
async function traducir() {

    const palabra =
        document.getElementById("palabra").value;

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

    document.getElementById("resultado").innerText =
        datos.resultado;

    document.getElementById("pronunciacion").innerText =
        "Pronunciación: " + datos.pronunciacion;

    document.getElementById(
        "palabra-practica"
    ).innerText = datos.resultado;
}

function hablar() {

    const texto =
        document.getElementById("resultado").innerText;

    const voz =
        new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);
}

function escuchar() {

    const reconocimiento =
        new webkitSpeechRecognition();

    reconocimiento.lang = "es-ES";

    reconocimiento.start();

    reconocimiento.onresult = function(evento) {

        const texto =
            evento.results[0][0].transcript;

        document.getElementById("palabra").value =
            texto;
    };
}

function escucharPronunciacion() {

    const palabraCorrecta =
        document
        .getElementById("palabra-practica")
        .innerText
        .toLowerCase();

    const reconocimiento =
        new webkitSpeechRecognition();

    reconocimiento.lang = "es-MX";
reconocimiento.continuous = false;
reconocimiento.interimResults = false;
reconocimiento.maxAlternatives = 3;

    reconocimiento.start();

    reconocimiento.onerror = function(evento) {
    document.getElementById("calificacion").innerText =
        "No pude escuchar bien. Intenta hablar más claro o más cerca del micrófono.";

    document.getElementById("tip").innerText =
        "Tip: pronuncia la palabra despacio, sin ruido de fondo.";
        
};

reconocimiento.onend = function() {
    console.log("Reconocimiento terminado");
};

    reconocimiento.onresult = function(evento) {

        const textoUsuario =
            evento.results[0][0]
            .transcript
            .toLowerCase();

        function similitud(a, b){

            a = a.toLowerCase();
            b = b.toLowerCase();

            let iguales = 0;

            for(
                let i = 0;
                i < Math.min(a.length, b.length);
                i++
            ){

                if(a[i] === b[i]){
                    iguales++;
                }
            }

            return Math.floor(
                (iguales / b.length) * 100
            );
        }

        let puntuacion =
            similitud(
                textoUsuario,
                palabraCorrecta
            );

        document.getElementById(
            "calificacion"
        ).innerText =

        "Dijiste: " +
        textoUsuario +
        " | Precisión: " +
        puntuacion +
        "%";
        document.getElementById(
    "barra-progreso"
).style.width = puntuacion + "%";

if(puntuacion >= 70){

    xp += 10;

} else if(puntuacion >= 50){

    xp += 5;
}

nivel = Math.floor(xp / 50) + 1;

document.getElementById(
    "xp"
).innerText = "XP: " + xp;

document.getElementById(
    "nivel"
).innerText = "Nivel: " + nivel;

        let tip = "";

        if(puntuacion >= 90){

            tip =
            "Excelente pronunciación 🔥";

        } else if(puntuacion >= 70){

            tip =
            "Muy bien. Intenta mejorar el final de la palabra.";

        } else if(puntuacion >= 50){

            tip =
            "La pronunciación es parecida, pero algunas sílabas cambiaron.";

        } else {

            tip =
            "Intenta hablar más lento y marcar mejor las vocales.";
        }

        if(
            textoUsuario[0] !==
            palabraCorrecta[0]
        ){

            tip +=
            " Revisa el inicio de la palabra.";
        }

        if(
            textoUsuario[
                textoUsuario.length - 1
            ] !==

            palabraCorrecta[
                palabraCorrecta.length - 1
            ]
        ){

            tip +=
            " Revisa cómo termina la palabra.";
        }

        document.getElementById(
            "tip"
        ).innerText = tip;
    };
}
const palabrasPractica = [
    "hola",
    "gracias",
    "comida",
    "tortilla",
    "escuela",
    "amigo",
    "familia",
    "casa",
    "perro",
    "gato",
    "caballo",
    "pollo",
    "trabajo",
    "dinero",
    "amor",
    "feliz",
    "grande",
    "pequeño",
    "bueno",
    "malo",
    "noche",
    "estrella",
    "libro",
    "mano",
    "cabeza"
];

function nuevaPalabra() {

    const aleatoria =
        palabrasPractica[
            Math.floor(
                Math.random() * palabrasPractica.length
            )
        ];

    document.getElementById("palabra").value =
        aleatoria;

    traducir();
}
function entrarApp(){

    document.getElementById(
        "intro"
    ).style.display = "none";
}