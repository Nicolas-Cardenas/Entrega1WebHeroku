let botonBuscar = document.getElementById("buscarViajes");
botonBuscar.addEventListener(
  "click",
  function () {
    buscarViajes();
  },
  false,
);

async function buscarViajes() {
  /* let origenBusqueda = document.getElementById("inputDestino").value;
  let destinoBusqueda = document.getElementById("inputOrigen").value;
  let fechaBusqueda = document.getElementById("inputFecha").value;
  let pasajerosBusqueda = document.getElementById("inputPasajeros").value;
 */
  let url = "https://carpoolingwebg1.herokuapp.com/api/viajes/";
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
      fetch(url, {
        method: "GET",
        headers: myHeaders2,
      })
        .then((res) => res.json())
        .then((json) => poblar(json))
        .catch(alert);
    });
}
/*   let params = {
        headers:{"Access-Control-Allow-Origin": "*"}
    }
    
    viajes = await fetch(url, params).then(res=>res.json()).then(res=>{return res})
 */
async function poblar(viajes) {
  let columnaDatosViajes = document.getElementsByClassName("col-md-8")[0];

  while (columnaDatosViajes.firstChild) {
    columnaDatosViajes.removeChild(columnaDatosViajes.lastChild);
  }

  for (let i = 0; i < viajes.length; i++) {
    columnaDatosViajes.insertAdjacentHTML(
      "beforeend",
      `<div class="card"></div>`,
    );

    document
      .getElementsByClassName("card")
      [i + 1].insertAdjacentHTML(
        "beforeend",
        `<div class="container row"></div>`,
      );
    document.getElementsByClassName("container row")[i].insertAdjacentHTML(
      "beforeend",
      `
        <div class="col-sm-2"><img scr='https://via.placeholder.com/150' class="rounded float-left"></div>
        <div class="col-sm">
            <h4>${viajes[i].direccion}</h4>
            <h5>Precio: $${viajes[i].precio}</h5>
            <h5>Fecha salida: ${viajes[i].fecha}</h5>
        </div>
        <div class="col-sm-3"><button type="submit" class="btn-primary btn-block btn-lg">Reservar</button></div>`,
    );
  }
}
