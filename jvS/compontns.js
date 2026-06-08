// Este archivo tiene partes que se repiten en todas las paginas

var menuHTML = `
<header>
    <h2>Postres Caseros</h2>
    <nav>
        <a href="index.html">Inicio</a>
        <a href="catalogo.html">Catálogo</a>
        <a href="pedidos.html">Pedidos</a>
        <a href="contacto.html">Contacto</a>
        <a href="login.html">Login</a>
    </nav>
</header>`;

var pieHTML = `
<footer>
    <p>Proyecto de Fundamentos de Tecnologías Web</p>
</footer>`;

function cargarMenuYPie(){
    document.getElementById("menu").innerHTML = menuHTML;
    document.getElementById("pie").innerHTML = pieHTML;
}

function crearTarjeta(postre){
    var azucar = "No";
    if(postre.sinAzucar == true){
        azucar = "Sí";
    }

    return `
    <article class="tarjeta">
        <img src="${postre.imagen}" alt="${postre.alt}">
        <h3>${postre.nombre}</h3>
        <p>${postre.descripcion}</p>
        <p><b>Categoría:</b> ${postre.categoria}</p>
        <p><b>Precio:</b> $${postre.precio}</p>
        <p><b>Sin azúcar:</b> ${azucar}</p>
    </article>`;
}
