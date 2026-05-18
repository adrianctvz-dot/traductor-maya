function hablar() {
    const texto = document.getElementById("palabra-practica").innerText;

    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = "es-MX";

    speechSynthesis.speak(voz);
}

function escuchar() {
    const reconocimiento = new webkitSpeechRecognition();

    reconocimiento.lang = "es-MX";
    reconocimiento.start();

    reconocimiento.onresult = function(evento) {
        const texto = evento.results[0][0].transcript;
        document.getElementById("palabra").value = texto;
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

function puntuar(usuario, correcto) {
    usuario = limpiarTexto(usuario);
    correcto = limpiarTexto(correcto);

    const variantes = [
        correcto,
        correcto.replaceAll("aa", "a"),
        correcto.replaceAll("ii", "i"),
        correcto.replaceAll("oo", "o"),
        correcto.replaceAll("uu", "u"),
        correcto.replaceAll("sh", "x"),
        correcto.replaceAll("x", "sh"),
        correcto.replaceAll("j", "h"),
        correcto.replaceAll("h", "j"),
        correcto.replaceAll("ts", "s"),
        correcto.replaceAll("ch", "sh")
    ];

    let mejor = 0;

    for (let variante of variantes) {
        let coincidencias = 0;
        let longitud = Math.max(usuario.length, variante.length);

        for (let i = 0; i < Math.min(usuario.length, variante.length); i++) {
            if (usuario[i] === variante[i]) {
                coincidencias++;
            }
        }

        let resultado = Math.round((coincidencias / longitud) * 100);

        if (resultado > mejor) {
            mejor = resultado;
        }
    }

    return mejor;
}

function generarTip(usuario, correcto, puntuacion) {
    usuario = limpiarTexto(usuario);
    correcto = limpiarTexto(correcto);

    if (puntuacion >= 90) {
        return "Excelente pronunciación.";
    }

    if (usuario.length < correcto.length) {
        return "Te faltó completar la palabra.";
    }

    if (usuario[0] !== correcto[0]) {
        return "El inicio sonó diferente.";
    }

    if (puntuacion >= 70) {
        return "Vas bien. Sigue practicando.";
    }

    if (puntuacion >= 50) {
        return "Escucha la palabra otra vez.";
    }

    return "Habla más lento y claro.";
}

function escucharPronunciacion() {
    const palabraCorrecta =
        document.getElementById("palabra-practica").innerText;

    const reconocimiento = new webkitSpeechRecognition();

    reconocimiento.lang = "es-MX";
    reconocimiento.continuous = false;
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 3;

    reconocimiento.start();

    reconocimiento.onerror = function() {
        document.getElementById("calificacion").innerText =
            "No pude escuchar bien.";

        document.getElementById("tip").innerText =
            "Habla más cerca del micrófono.";
    };

    reconocimiento.onresult = function(evento) {
        const textoUsuario = evento.results[0][0].transcript;

        const puntuacion = puntuar(textoUsuario, palabraCorrecta);
        const tip = generarTip(textoUsuario, palabraCorrecta, puntuacion);

        document.getElementById("calificacion").innerText =
            "Dijiste: " + textoUsuario +
            " | Esperado: " + palabraCorrecta +
            " | Precisión: " + puntuacion + "%";

        document.getElementById("tip").innerText = tip;
        document.getElementById("barra-progreso").style.width =
            puntuacion + "%";

        actualizarAvatar(puntuacion);

        if (puntuacion >= 70) {
    xp += 10;
    racha++;
}
else if (puntuacion >= 50) {
    xp += 5;
}

        nivel = Math.floor(xp / 50) + 1;

        document.getElementById("xp").innerText = "XP: " + xp;
        document.getElementById("nivel").innerText = "Nivel: " + nivel;
        document.getElementById("xp").innerText =
    "XP: " + xp;

document.getElementById("nivel").innerText =
    "Nivel: " + nivel;

localStorage.setItem("xp", xp);
localStorage.setItem("nivel", nivel);
localStorage.setItem("racha", racha);

document.getElementById(
    "racha"
).innerText =
    "🔥 Racha: " + racha + " día";
        if(xp >= 10){

    document.getElementById(
        "logro1"
    ).innerText =
        "✅ Primer traducción";
}

if(puntuacion >= 90){

    document.getElementById(
        "logro2"
    ).innerText =
        "✅ Pronunciación perfecta";
}

if(nivel >= 2){

    document.getElementById(
        "logro3"
    ).innerText =
        "✅ Nivel 2";

}
    };
}