const header = document.querySelector("header");
const footer = document.querySelector("footer");

header.innerHTML = `
<div class="logo-nav" >
        <img class="logonav" src="img/isologo-grupo.png" alt="logo agencia de aprendizaje">
      </div>

      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="login.html">Inicio</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="registro.html">Registro</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="gruposConformados.html">Alumnos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="alumnos.html" >Profesores</a>
              </li>
            </ul>
            <form class="d-flex" role="login">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Iniciar sesión</button>
            </form>
          </div>
        </div>
      </nav>
`; 

footer.innerHTML=`
<div class="contact-info">
<a name="contacto"> </a>
<p>Contacto</p>
<a class="highlight" href="mailto:io.codoacodo@bue.edu.ar">io.codoacodo@bue.edu.ar</a>
</div>
<div class="logo-ba">
<img src="img/logo-bac.png" alt="agencia de aprendizaje"></h1>
</div>
`;