document.addEventListener("DOMContentLoaded", function(){
    if(typeof cargarMenuYPie == "function"){
        cargarMenuYPie();
    }

    var pagina = document.body.getAttribute("data-pagina");

    if(pagina == "catalogo"){
        cargarPostres();
    }
});

var postresGuardados = [];

function cargarPostres(){
    fetch("../xml/postres.xml")
    .then(function(respuesta){
        return respuesta.text();
    })
    .then(function(datos){
        var parser = new DOMParser();
        var xml = parser.parseFromString(datos, "text/xml");

        var postres = xml.getElementsByTagName("postre");
        postresGuardados = [];

        for(var i = 0; i < postres.length; i++){
            var postre = {
                nombre: postres[i].getElementsByTagName("nombre")[0].textContent,
                categoria: postres[i].getElementsByTagName("categoria")[0].textContent,
                precio: postres[i].getElementsByTagName("precio")[0].textContent,
                sinAzucar: postres[i].getElementsByTagName("sinAzucar")[0].textContent,
                imagen: postres[i].getElementsByTagName("imagen")[0].textContent,
                alt: postres[i].getElementsByTagName("alt")[0].textContent,
                descripcion: postres[i].getElementsByTagName("descripcion")[0].textContent
            };

            postresGuardados.push(postre);
        }

        mostrarPostres(postresGuardados);
        activarFiltros();
    })
    .catch(function(error){
        console.log("No se pudo cargar el XML");
        console.log(error);
    });
}

function mostrarPostres(lista){
    var tabla = document.getElementById("tablaPostres");
    var contenedor = document.getElementById("listaPostres");

    tabla.innerHTML = "";
    contenedor.innerHTML = "";

    for(var i = 0; i < lista.length; i++){
        tabla.innerHTML += "<tr>" +
            "<td>" + lista[i].nombre + "</td>" +
            "<td>" + lista[i].categoria + "</td>" +
            "<td>$" + lista[i].precio + "</td>" +
            "<td>" + lista[i].sinAzucar + "</td>" +
        "</tr>";

        contenedor.innerHTML += "<div class='postre'>" +
            "<img src='" + lista[i].imagen + "' alt='" + lista[i].alt + "'>" +
            "<h3>" + lista[i].nombre + "</h3>" +
            "<p>" + lista[i].descripcion + "</p>" +
            "<p>Categoria: " + lista[i].categoria + "</p>" +
            "<p>Precio: $" + lista[i].precio + "</p>" +
        "</div>";
    }
}

function activarFiltros(){
    document.getElementById("buscar").addEventListener("keyup", filtrarPostres);
    document.getElementById("categoria").addEventListener("change", filtrarPostres);
    document.getElementById("precio").addEventListener("input", filtrarPostres);
    document.getElementById("sinAzucar").addEventListener("change", filtrarPostres);

    document.getElementById("btnLimpiar").addEventListener("click", function(){
        document.getElementById("buscar").value = "";
        document.getElementById("categoria").value = "todos";
        document.getElementById("precio").value = 100;
        document.getElementById("precioTexto").textContent = 100;
        document.getElementById("sinAzucar").checked = false;

        mostrarPostres(postresGuardados);
    });
}

function filtrarPostres(){
    var texto = document.getElementById("buscar").value.toLowerCase();
    var categoria = document.getElementById("categoria").value;
    var precio = document.getElementById("precio").value;
    var sinAzucar = document.getElementById("sinAzucar").checked;

    document.getElementById("precioTexto").textContent = precio;

    var resultado = [];

    for(var i = 0; i < postresGuardados.length; i++){
        var nombre = postresGuardados[i].nombre.toLowerCase();

        var cumpleNombre = nombre.includes(texto);
        var cumpleCategoria = categoria == "todos" || postresGuardados[i].categoria == categoria;
        var cumplePrecio = Number(postresGuardados[i].precio) <= Number(precio);
        var cumpleAzucar = sinAzucar == false || postresGuardados[i].sinAzucar == "true";

        if(cumpleNombre && cumpleCategoria && cumplePrecio && cumpleAzucar){
            resultado.push(postresGuardados[i]);
        }
    }

    mostrarPostres(resultado);
}