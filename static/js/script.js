let xp = Number(localStorage.getItem("xp")) || 0;
let nivel = Number(localStorage.getItem("nivel")) || 1;
let racha =
    Number(localStorage.getItem("racha")) || 1;




    const datos = await respuesta.json();

    document.getElementById("resultado").innerText = datos.resultado;
    document.getElementById("pronunciacion-texto").innerText =
        "Pronunciación: " + datos.pronunciacion;

    document.getElementById("palabra-practica").innerText =
        datos.pronunciacion;

    document.getElementById("calificacion").innerText = "";
    document.getElementById("tip").innerText = "";
    document.getElementById("barra-progreso").style.width = "0%";

    const datos = await respuesta.json();

    document.getElementById("resultado").innerText = datos.resultado;
    document.getElementById("pronunciacion-texto").innerText =
        "Traducción generada por IA.";

    document.getElementById("palabra-practica").innerText = datos.resultado;


function mostrarSeccion(id){

    const secciones =
        document.querySelectorAll(
            ".seccion"
        );

    secciones.forEach(seccion => {

        seccion.style.display =
            "none";
    });

    document.getElementById(id)
        .style.display = "block";
}

mostrarSeccion("traductor"); 

