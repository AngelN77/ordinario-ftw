document.addEventListener("DOMContentLoaded", function(){
    console.log("pedidos.js cargado");

    if(typeof cargarMenuYPie == "function"){
        cargarMenuYPie();
    }

    var pagina = document.body.getAttribute("data-pagina");

    if(pagina == "pedidos"){
        iniciarPedidos();
    }
});

var pedidosGuardados = [];

function iniciarPedidos(){
    cargarPedidos();

    document.getElementById("estado").addEventListener("change", filtrarPedidos);

    document.getElementById("formPedido").addEventListener("submit", function(evento){
        evento.preventDefault();

        var cliente = document.getElementById("cliente").value;
        var postre = document.getElementById("postre").value;
        var cantidad = document.getElementById("cantidad").value;

        if(cliente == "" || postre == "" || cantidad == ""){
            document.getElementById("mensajePedido").innerHTML = "Faltan datos del pedido.";
        }else{
            var nuevoPedido = {
                cliente: cliente,
                postre: postre,
                cantidad: cantidad,
                estado: "Pendiente"
            };

            pedidosGuardados.push(nuevoPedido);

            document.getElementById("mensajePedido").innerHTML = "Pedido agregado a la tabla.";
            document.getElementById("formPedido").reset();

            filtrarPedidos();
        }
    });
}

function cargarPedidos(){
    var tabla = document.getElementById("tablaPedidos");
    tabla.innerHTML = "<tr><td colspan='4'>Cargando pedidos...</td></tr>";

    fetch("../xml/pedidos.xml")
    .then(function(respuesta){
        if(!respuesta.ok){
            throw new Error("No se encontro pedidos.xml");
        }
        return respuesta.text();
    })
    .then(function(datos){
        var parser = new DOMParser();
        var xml = parser.parseFromString(datos, "text/xml");

        var pedidosXML = xml.getElementsByTagName("pedido");
        pedidosGuardados = [];

        for(var i = 0; i < pedidosXML.length; i++){
            var cliente = pedidosXML[i].getElementsByTagName("cliente")[0].textContent;
            var postre = pedidosXML[i].getElementsByTagName("postre")[0].textContent;
            var cantidad = pedidosXML[i].getElementsByTagName("cantidad")[0].textContent;
            var estado = pedidosXML[i].getElementsByTagName("estado")[0].textContent;

            var pedido = {
                cliente: cliente,
                postre: postre,
                cantidad: cantidad,
                estado: estado
            };

            pedidosGuardados.push(pedido);
        }

        mostrarPedidos(pedidosGuardados);
    })
    .catch(function(error){
        tabla.innerHTML = "<tr><td colspan='4'>No se pudo cargar pedidos.xml</td></tr>";
        console.log(error);
    });
}

function mostrarPedidos(lista){
    var tabla = document.getElementById("tablaPedidos");
    var cadena = "";

    for(var i = 0; i < lista.length; i++){
        cadena += "<tr>";
        cadena += "<td>" + lista[i].cliente + "</td>";
        cadena += "<td>" + lista[i].postre + "</td>";
        cadena += "<td>" + lista[i].cantidad + "</td>";
        cadena += "<td>" + lista[i].estado + "</td>";
        cadena += "</tr>";
    }

    tabla.innerHTML = cadena;
}

function filtrarPedidos(){
    var estado = document.getElementById("estado").value;
    var resultado = [];

    for(var i = 0; i < pedidosGuardados.length; i++){
        if(estado == "todos" || pedidosGuardados[i].estado == estado){
            resultado.push(pedidosGuardados[i]);
        }
    }

    mostrarPedidos(resultado);
}