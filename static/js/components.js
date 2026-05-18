function crearMensaje(tipo, texto){
function crearMision(texto){

    return `
        <div class="mision">
            ⬜ ${texto}
        </div>
    `;
}
    return `
        <div class="mensaje ${tipo}">
            ${texto}
        </div>
    `;
}