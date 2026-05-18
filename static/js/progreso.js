const misiones = [
    "Aprende 3 palabras de animales",
    "Pronuncia una palabra correctamente",
    "Usa la traducción inteligente",
    "Habla con el tutor IA",
    "Practica una palabra de familia",
    "Traduce una palabra de escuela"
];

function cargarMisiones(){

    const contenedor =
        document.getElementById("misiones-lista");

    contenedor.innerHTML = "";

    for(let i = 0; i < 3; i++){

        const aleatoria =
            misiones[
                Math.floor(
                    Math.random() * misiones.length
                )
            ];

        contenedor.innerHTML +=
            crearMision(aleatoria);
    }
}

cargarMisiones();
function completarMision(texto){

    const misiones =
        document.querySelectorAll(".mision");

    misiones.forEach(mision => {

        if(
            mision.innerText.includes(texto)
        ){

            mision.innerHTML =
                mision.innerHTML.replace(
                    "⬜",
                    "✅"
                );

            xp += 20;

            document.getElementById("xp")
                .innerText =
                "XP: " + xp;

            localStorage.setItem(
                "xp",
                xp
            );
        }
    });
}