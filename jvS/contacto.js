document.addEventListener("DOMContentLoaded", function(){
    if(typeof cargarMenuYPie == "function"){
        cargarMenuYPie();
    }

    var formulario = document.getElementById("formContacto");

    formulario.addEventListener("submit", function(evento){
        evento.preventDefault();

        var nombre = document.getElementById("nombreContacto").value;
        var correo = document.getElementById("correoContacto").value;
        var mensaje = document.getElementById("mensajeContacto").value;
        var respuesta = document.getElementById("respuestaContacto");

        if(nombre == "" || correo == "" || mensaje == ""){
            respuesta.innerHTML = "Faltan datos por llenar.";
            respuesta.style.color = "red";
        }else{
            respuesta.innerHTML = "Gracias " + nombre + ", tu mensaje fue enviado.";
            respuesta.style.color = "green";
            formulario.reset();
        }
    });
});