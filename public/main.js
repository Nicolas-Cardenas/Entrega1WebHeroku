let btnInicio = document.getElementById("InicioSesion");
btnInicio.setAttribute("data-toggle", "modal");
btnInicio.setAttribute("data-target", "#modalInicio");

let btnRegistrar = document.getElementById("Registrarse");
btnRegistrar.setAttribute("data-toggle", "modal");
btnRegistrar.setAttribute("data-target", "#modalRegistrar");

let btnSiguiente = document.getElementById("btnModalInicio");
btnSiguiente.addEventListener("click", () => {
  let correo = document.getElementById("correoId").value;
  let password = document.getElementById("contraseñaId").value;
  if (correo != undefined && password != undefined) {
    let location =
      "./perfiles.html" + "?correo=" + correo + "&contrasena=" + password;
    window.location = location;
  }
});
