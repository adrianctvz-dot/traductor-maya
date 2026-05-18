function crearMensaje(tipo, texto){

    return `
        <div class="mensaje ${tipo}">
            ${texto}
        </div>
    `;
}

function crearMision(texto){

    return `
        <div class="mision">
            ⬜ ${texto}
        </div>
    `;
}