var menuHTML = `
<header>
    <h2>Postres ricos y deliciosos</h2>
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
    <p></p>
</footer>`;

function cargarMenuYPie(){
    document.getElementById("menu").innerHTML = menuHTML;
    document.getElementById("pie").innerHTML = pieHTML;
}