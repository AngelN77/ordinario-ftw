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