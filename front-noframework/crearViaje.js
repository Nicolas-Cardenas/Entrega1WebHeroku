let form = document.getElementById("formulario_crear_viaje");

form.onsubmit = async (e) => {
  e.preventDefault();
  formData = new FormData(form);
  formData.delete("confirmar");
  let data = {
    username: "admin",
    password: "password",
  };
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  fetch("https://carpoolingwebg1.herokuapp.com/api/login", {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => json.token)
    .then((token) => {
      let myHeaders2 = new Headers();
      myHeaders2.append("Authorization", "Bearer " + token);
      myHeaders2.append("Content-Type", "application/json");
      fetch("https://carpoolingwebg1.herokuapp.com/api/viajes", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: myHeaders2,
      })
        .then(alert)
        .catch(alert);
    });
};

let btnCrearViaje = document.getElementById("crear_viaje_boton");
btnCrearViaje.setAttribute("data-toggle", "modal");
btnCrearViaje.setAttribute("data-target", "#modalCreacionViaje");


