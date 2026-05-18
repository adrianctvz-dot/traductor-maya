function hablarAvatar(texto) {
    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang = "es-MX";
    voz.rate = 1;

    speechSynthesis.speak(voz);
}
async function enviarMensaje(){

    const input =
        document.getElementById(
            "mensaje-chat"
        );

    const texto =
        input.value;

    if(!texto){
        return;
    }

    const chat =
        document.getElementById(
            "chat-mensajes"
        );

    chat.innerHTML += `
        <div class="mensaje usuario">
            ${texto}
        </div>
    `;

    input.value = "";

    const respuesta =
        await fetch("/chat-ia", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body: JSON.stringify({
            mensaje: texto
        })
    });

    const datos =
        await respuesta.json();

    chat.innerHTML += `
        <div class="mensaje ia">
            ${datos.respuesta}
        </div>
    `;

    const vozIA =
    new SpeechSynthesisUtterance(datos.respuesta);

vozIA.lang = "es-MX";
vozIA.rate = 1;

speechSynthesis.speak(vozIA);

    chat.scrollTop =
        chat.scrollHeight;
}