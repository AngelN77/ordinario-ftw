// Variables generales
var postres = [];
var pedidos = [];

// Cuando carga la pagina revisa en cual estamos
window.addEventListener("load", function(){
    cargarMenuYPie();

    var pagina = document.body.getAttribute("data-pagina");

    if(pagina == "inicio"){
        iniciarInicio();
    }
    if(pagina == "catalogo"){
        iniciarCatalogo();
    }
    if(pagina == "pedidos"){
        iniciarPedidos();
    }
    if(pagina == "login"){
        iniciarLogin();
    }
    if(pagina == "contacto"){
        iniciarContacto();
    }
});

// Funcion para cargar un XML
function cargarXML(ruta){
    return fetch(ruta)
    .then(function(respuesta){
        return respuesta.text();
    })
    .then(function(texto){
        var parser = new DOMParser();
        return parser.parseFromString(texto, "text/xml");
    });
}

// Convierte el XML de postres en arreglo de JavaScript
function leerPostres(xml){
    var lista = xml.getElementsByTagName("postre");
    var datos = [];

    for(var i=0; i<lista.length; i++){
        var p = lista[i];
        datos.push({
            nombre: p.getElementsByTagName("nombre")[0].textContent,
            categoria: p.getElementsByTagName("categoria")[0].textContent,
            precio: Number(p.getElementsByTagName("precio")[0].textContent),
            sinAzucar: p.getElementsByTagName("sinAzucar")[0].textContent == "true",
            imagen: p.getElementsByTagName("imagen")[0].textContent,
            alt: p.getElementsByTagName("alt")[0].textContent,
            descripcion: p.getElementsByTagName("descripcion")[0].textContent
        });
    }
    return datos;
}

function iniciarInicio(){
    cargarXML("../xml/postres.xml").then(function(xml){
        postres = leerPostres(xml);
        var caja = document.getElementById("postresInicio");

        for(var i=0; i<3; i++){
            caja.innerHTML += crearTarjeta(postres[i]);
        }
    });
}

function iniciarCatalogo(){
    cargarXML("../xml/postres.xml").then(function(xml){
        postres = leerPostres(xml);
        mostrarPostres(postres);
    });

    document.getElementById("buscar").addEventListener("keyup", filtrarPostres);
    document.getElementById("categoria").addEventListener("change", filtrarPostres);
    document.getElementById("precio").addEventListener("input", filtrarPostres);
    document.getElementById("sinAzucar").addEventListener("change", filtrarPostres);

    document.getElementById("btnLimpiar").addEventListener("click", function(){
        document.getElementById("buscar").value = "";
        document.getElementById("categoria").value = "todos";
        document.getElementById("precio").value = 100;
        document.getElementById("sinAzucar").checked = false;
        filtrarPostres();
    });
}

function mostrarPostres(lista){
    var contenedor = document.getElementById("listaPostres");
    var tabla = document.getElementById("tablaPostres");

    contenedor.innerHTML = "";
    tabla.innerHTML = "";

    for(var i=0; i<lista.length; i++){
        contenedor.innerHTML += crearTarjeta(lista[i]);

        var azucar = "No";
        if(lista[i].sinAzucar == true){
            azucar = "Sí";
        }

        tabla.innerHTML += `
        <tr>
            <td>${lista[i].nombre}</td>
            <td>${lista[i].categoria}</td>
            <td>$${lista[i].precio}</td>
            <td>${azucar}</td>
        </tr>`;
    }
}

function filtrarPostres(){
    var texto = document.getElementById("buscar").value.toLowerCase();
    var categoria = document.getElementById("categoria").value;
    var precio = Number(document.getElementById("precio").value);
    var sinAzucar = document.getElementById("sinAzucar").checked;

    document.getElementById("precioTexto").textContent = precio;

    var resultado = [];

    for(var i=0; i<postres.length; i++){
        var p = postres[i];
        var cumpleTexto = p.nombre.toLowerCase().includes(texto);
        var cumpleCategoria = categoria == "todos" || p.categoria == categoria;
        var cumplePrecio = p.precio <= precio;
        var cumpleAzucar = sinAzucar == false || p.sinAzucar == true;

        if(cumpleTexto && cumpleCategoria && cumplePrecio && cumpleAzucar){
            resultado.push(p);
        }
    }

    mostrarPostres(resultado);
}

function iniciarPedidos(){
    cargarXML("../xml/pedidos.xml").then(function(xml){
        var lista = xml.getElementsByTagName("pedido");
        pedidos = [];

        for(var i=0; i<lista.length; i++){
            pedidos.push({
                cliente: lista[i].getElementsByTagName("cliente")[0].textContent,
                postre: lista[i].getElementsByTagName("postre")[0].textContent,
                cantidad: lista[i].getElementsByTagName("cantidad")[0].textContent,
                estado: lista[i].getElementsByTagName("estado")[0].textContent
            });
        }
        mostrarPedidos(pedidos);
    });

    document.getElementById("estado").addEventListener("change", filtrarPedidos);

    document.getElementById("formPedido").addEventListener("submit", function(e){
        e.preventDefault();

        var cliente = document.getElementById("cliente").value;
        var postre = document.getElementById("postre").value;
        var cantidad = document.getElementById("cantidad").value;

        pedidos.push({cliente:cliente, postre:postre, cantidad:cantidad, estado:"Pendiente"});
        document.getElementById("mensajePedido").textContent = "Pedido agregado a la tabla.";
        document.getElementById("formPedido").reset();
        filtrarPedidos();
    });
}

function mostrarPedidos(lista){
    var tabla = document.getElementById("tablaPedidos");
    tabla.innerHTML = "";

    for(var i=0; i<lista.length; i++){
        tabla.innerHTML += `
        <tr>
            <td>${lista[i].cliente}</td>
            <td>${lista[i].postre}</td>
            <td>${lista[i].cantidad}</td>
            <td>${lista[i].estado}</td>
        </tr>`;
    }
}

function filtrarPedidos(){
    var estado = document.getElementById("estado").value;
    var resultado = [];

    for(var i=0; i<pedidos.length; i++){
        if(estado == "todos" || pedidos[i].estado == estado){
            resultado.push(pedidos[i]);
        }
    }
    mostrarPedidos(resultado);
}

function iniciarLogin(){
    document.getElementById("formLogin").addEventListener("submit", function(e){
        e.preventDefault();

        var usuario = document.getElementById("usuario").value;
        var password = document.getElementById("password").value;
        var mensaje = document.getElementById("mensajeLogin");

        cargarXML("../xml/usuarios.xml").then(function(xml){
            var lista = xml.getElementsByTagName("usuario");
            var encontrado = false;

            for(var i=0; i<lista.length; i++){
                var u = lista[i].getElementsByTagName("nombre")[0].textContent;
                var p = lista[i].getElementsByTagName("password")[0].textContent;

                if(usuario == u && password == p){
                    encontrado = true;
                }
            }

            if(encontrado){
                mensaje.textContent = "Bienvenido " + usuario;
            }else{
                mensaje.textContent = "Usuario o contraseña incorrectos";
            }
        });
    });
}

function iniciarContacto(){
    document.getElementById("formContacto").addEventListener("submit", function(e){
        e.preventDefault();
        document.getElementById("mensajeContacto").textContent = "Mensaje enviado correctamente.";
        document.getElementById("formContacto").reset();
    });
}
