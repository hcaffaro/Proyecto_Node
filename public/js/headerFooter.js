document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    const email = localStorage.getItem('email');
    const rol = localStorage.getItem('rol');

    header.innerHTML = `
    <div class="logo-nav">
        <img class="logonav" src="/img/isologo-grupo.png" alt="logo agencia de aprendizaje">
    </div>

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.html">Inicio</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" id="navPerfil" href='/perfil?email=${email}' >Mi perfil</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="navDropdown">
                        Grupos
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href='/myGroup?email=${email}' id="navGrupo" >Mi grupo</a></li>
                            <li><a class="dropdown-item" id="navAlumnos" href='/alumnos'>Grupos conformados</a>
                    </ul>
                 </li>
                    <li class="nav-item">
                        <a class="nav-link active" id="navProfesores" href='/profesores?email=${email}'>Armado de grupos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" id="navAdmin" href='/admin'>Administracion</a>
                    </li>
                </ul>
                ${email ? `
                    <div class="d-flex align-items-center">
                        <span class="me-2">Bienvenido, ${email}</span>
                        <button type="button" class="btn btn-secondary" id="logoutBtn">Cerrar sesión</button>
                    </div>
                ` : `
                    <form action="/login" method="get">
                        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                    </form>
                `}
            </div>
        </div>
    </nav>
    `;

    footer.innerHTML = `
    <div class="contact-info">
        <a name="contacto"></a>
        <p>Contacto</p>
        <a class="highlight" href="mailto:io.codoacodo@bue.edu.ar">io.codoacodo@bue.edu.ar</a>
    </div>
    <div class="logo-ba">
        <img src="img/logo-bac.png" alt="agencia de aprendizaje">
    </div>
    `;

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('email');
            localStorage.removeItem('rol');
            window.location.href = '/index.html';
        });
    }

    const perfil = document.getElementById("navPerfil");
    const alumnos = document.getElementById("navAlumnos");
    const profesores = document.getElementById("navProfesores");
    const admin = document.getElementById("navAdmin");
    const miGrupo = document.getElementById("navGrupo");
    const drop = document.getElementById("navDropdown");

    if (email) {
        drop.hidden=false;
        perfil.hidden = false;
        alumnos.hidden = false;
        if (rol === 'Student') {
            admin.hidden = true;
            profesores.hidden = true;
            miGrupo.hidden= false;
        } else if (rol === 'Teacher') {
            admin.hidden = true;
            profesores.hidden = false;
            miGrupo.hidden = true;
        } else {
            admin.hidden = false;
            alumnos.hidden = true;
            profesores.hidden = true;
            miGrupo.hidden = true;
        }
    } else {
        perfil.hidden = true;
        admin.hidden = true;
        profesores.hidden = true;     
        drop.hidden = true;
    }
});
