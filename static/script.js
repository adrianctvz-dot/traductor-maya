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

    document.getElementById("palabra-practica").innerText =
        datos.pronunciacion;

    document.getElementById("calificacion").innerText = "";
    document.getElementById("tip").innerText = "";
    document.getElementById("barra-progreso").style.width = "0%";
}

function hablar() {

    const texto =
        document.getElementById("palabra-practica").innerText;

    const voz =
        new SpeechSynthesisUtterance(texto);

    voz.lang = "es-MX";

    speechSynthesis.speak(voz);
}

function escuchar() {

    const reconocimiento =
        new webkitSpeechRecognition();

    reconocimiento.lang = "es-MX";

    reconocimiento.start();

    reconocimiento.onresult = function(evento) {

        const texto =
            evento.results[0][0].transcript;

        document.getElementById("palabra").value =
            texto;
    };
}

function limpiarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zñ ]/g, "")
        .trim();
}

function calcularSimilitud(usuario, correcto) {

    usuario = limpiarTexto(usuario);
    correcto = limpiarTexto(correcto);

    let coincidencias = 0;
    let longitud = Math.max(usuario.length, correcto.length);

    for(let i = 0; i < Math.min(usuario.length, correcto.length); i++){

        if(usuario[i] === correcto[i]){
            coincidencias++;
        }
    }

    return Math.round((coincidencias / longitud) * 100);
}

function generarTip(usuario, correcto, puntuacion) {

    usuario = limpiarTexto(usuario);
    correcto = limpiarTexto(correcto);

    if(puntuacion >= 90){
        return "Excelente pronunciación. La palabra se escuchó muy parecida.";
    }

    if(usuario.length < correcto.length){
        return "Te faltó completar la palabra. Intenta pronunciarla más despacio y no cortar el final.";
    }

    if(usuario.length > correcto.length + 2){
        return "Agregaste sonidos extra. Intenta decir la palabra más corta y clara.";
    }

    if(usuario[0] !== correcto[0]){
        return "El inicio no sonó igual. Practica la primera sílaba antes de decir toda la palabra.";
    }

    if(usuario[usuario.length - 1] !== correcto[correcto.length - 1]){
        return "El final fue diferente. Intenta marcar mejor la última sílaba.";
    }

    const vocales = ["a", "e", "i", "o", "u"];

    for(let vocal of vocales){

        const cantidadUsuario =
            usuario.split(vocal).length - 1;

        const cantidadCorrecto =
            correcto.split(vocal).length - 1;

        if(cantidadUsuario < cantidadCorrecto){
            return "Te faltó alargar o marcar mejor la vocal '" + vocal + "'.";
        }
    }

    if(puntuacion >= 70){
        return "Vas bien. Solo intenta pronunciar más claro cada sílaba.";
    }

    if(puntuacion >= 50){
        return "La palabra se parece, pero algunas letras cambiaron. Escucha la pronunciación y repítela más lento.";
    }

    return "Intenta acercarte más al micrófono, hablar sin ruido y repetir la palabra por sílabas.";
}

function escucharPronunciacion() {

    const palabraCorrecta =
        document.getElementById("palabra-practica").innerText;

    const reconocimiento =
        new webkitSpeechRecognition();

    reconocimiento.lang = "es-MX";
    reconocimiento.continuous = false;
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 3;

    reconocimiento.start();

    reconocimiento.onerror = function() {

        document.getElementById("calificacion").innerText =
            "No pude escuchar bien.";

        document.getElementById("tip").innerText =
            "Tip: habla más cerca del micrófono, sin ruido de fondo.";
    };

    reconocimiento.onresult = function(evento) {

        const textoUsuario =
            evento.results[0][0].transcript;

        const puntuacion =
            calcularSimilitud(textoUsuario, palabraCorrecta);

        const tip =
            generarTip(textoUsuario, palabraCorrecta, puntuacion);

        document.getElementById("calificacion").innerText =
            "Dijiste: " + textoUsuario +
            " | Esperado: " + palabraCorrecta +
            " | Precisión: " + puntuacion + "%";

        document.getElementById("tip").innerText =
            tip;

        document.getElementById("barra-progreso").style.width =
            puntuacion + "%";

        if(puntuacion >= 70){
            xp += 10;
        } else if(puntuacion >= 50){
            xp += 5;
        }

        nivel = Math.floor(xp / 50) + 1;

        document.getElementById("xp").innerText =
            "XP: " + xp;

        document.getElementById("nivel").innerText =
            "Nivel: " + nivel;
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

    document.getElementById("intro").style.display =
        "none";
}
async function traduccionIA() {

    const palabra =
        document.getElementById("palabra").value;

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

    document.getElementById("resultado").innerText =
        datos.resultado;

    document.getElementById("pronunciacion").innerText =
        "Traducción generada por IA. Verifica con una fuente confiable.";

    document.getElementById("palabra-practica").innerText =
        datos.resultado;
}