let form = document.getElementById("registrarForm");

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
      fetch("https://carpoolingwebg1.herokuapp.com/api/conductores", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: myHeaders2,
      })
        .then((window.location.href = "./crearViaje.html"))
        .catch(alert);
    });
};
