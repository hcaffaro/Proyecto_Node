const modal = document.querySelector("div[class=inicio]");
modal.innerHTML=`
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Iniciar sesión</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="form-login">
            <div class="login-welcome">
                <h2 class="welcome">&#x1f3db; Bienvenidos!!!</h2>
                <p class="welcome">Gestor de Grupos de Alumnos</p>
            </div>
            <div class="form-input">
                <label for="email" class="input-label">Email: </label>
                <input type="email" id="email" name="email" class="email-in" placeholder="Ingresa tu Email" required>
            </div class="form-input">
                <label for="password" class="input-label">Contraseña: </label>
                <input type="password" id="password" name="password" class="password-in" placeholder="Ingresa tu Contraseña" required>
            <div class="form-input">
                <button type="submit" class="btn-form" >Acceder</button>
            </div>
        </form>
          <!-- <hr>
          <h2 class="fs-5">Registrarse</h2>
          <p> ¿No estas registrado? <a href="registro.html" data-bs-toggle="tooltip" title="Tooltip">Registrate.</a> </p>
        </div> -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div> 

`;
const myModal = document.getElementById('myModal');
const myInput = document.getElementById('myInput');

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
});