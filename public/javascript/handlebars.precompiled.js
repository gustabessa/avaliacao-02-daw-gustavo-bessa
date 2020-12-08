$(function () {
  // Grab the template script
  const navbar = 
`<nav id="sidebar" class="active scrollbar scrollbar-pink square">
    <div class="sidebar-header">
        <h3>Menu</h3>
    </div>

    <ul class="list-unstyled components">
        <li>
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
            <ul class="collapse list-unstyled" id="homeSubmenu">
                <li>
                    <a href="/#home">Home</a>
                </li>
                <li>
                    <a href="/#subscribe">Sobre</a>
                </li>
                <li>
                    <a href="/#vagas">Inscreva-se</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="/cadastro-profissional">Cadastro Profissional*</a>
        </li>
        <li>
            <a href="/profisionais-credenciados">Profissionais Credenciados</a>
        </li>
        <li>
            <a href="/vagas">Vagas Disponíveis</a>
        </li>
    </ul>
</nav>`

  // Add the compiled html to the page
  $('#output').html(navbar);
});