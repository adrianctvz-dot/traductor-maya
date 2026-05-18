function crearMensaje(tipo, texto){

    return `
        <div class="mensaje ${tipo}">
            ${texto}
        </div>
    `;
}