/*pasajeros = [
  {
    nombre: "Pepito",
    celular: 320131313,
    correo: "pepito@pasajero.com",
    edad: 21,
  },
  {
    nombre: "Pepita",
    celular: 321313,
    correo: "pepito@pasajero.com",
    edad: 23,
  },
  {
    nombre: "Pepitaaaa",
    celular: 3201,
    correo: "pepito@pasajero.com",
    edad: 28,
  },
];
*/

pasajero = {};
vehiculo = {};
id = 1;
url_pasajeros = "https://carpoolingwebg1.herokuapp.com/api/pasajeros";
url_conductor = "https://carpoolingwebg1.herokuapp.com/api/conductores";
url_vehiculo = "https://carpoolingwebg1.herokuapp.com/api/vehiculos/1";
//url_pasajeros = "http://localhost:3001/api/pasajeros/";
//url_conductor = "http://localhost:3001/api/conductores";

const urlParams = new URLSearchParams(window.location.search);
const correo = urlParams.get("correo");
const contrasena = urlParams.get("contrasena");

url_pasajeros += "?correo=" + correo + "&contrasena=" + contrasena;
url_conductor += "?correo=" + correo + "&contrasena=" + contrasena;

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
    fetch(url_pasajeros, {
      method: "GET",
      headers: myHeaders2,
    })
      .then((response) => response.json())
      .then((data) => {
        pasajero = data;
        perfiles();
      })
      .catch(() => {
        fetch(url_conductor, {
          headers: myHeaders2,
        })
          .then((response) => response.json())
          .then((data) => {
            pasajero = data;
            fetch(url_vehiculo, { headers: myHeaders2 })
              .then((response) => response.json())
              .then((data) => {
                vehiculo = data;
                perfiles();
              });
          });
      });
  });

function perfiles() {
  main = document.getElementsByTagName("main")[0];

  if (pasajero.foto != null) {
    mainRow1 = document.createElement("div");
    mainRow1.setAttribute("class", "row");

    divImagen1 = document.createElement("div");
    divImagen1.setAttribute("class", "col-2");
    divImagen1.setAttribute("id", "perfilImagen");

    imagen1 = document.createElement("img");
    imagen1.setAttribute(
      "src",
      "https://upload.wikimedia.org/wikipedia/commons/d/d8/Emblem-person-blue.svg",
    );
    imagen1.setAttribute("id", "imagenPerfil");
    divImagen1.appendChild(imagen1);

    divPerfil1 = document.createElement("div");
    divPerfil1.setAttribute("class", "col-7");
    divPerfil1.setAttribute("id", "perfiles");

    row11 = document.createElement("div");
    row11.setAttribute("class", "row");

    col11 = document.createElement("div");
    col11.setAttribute("class", "col");
    h1Col11 = document.createElement("h1");
    h1Col11.innerHTML = pasajero.nombre;
    col11.appendChild(h1Col11);

    col21 = document.createElement("div");
    col21.setAttribute("class", "col");
    h1Col21 = document.createElement("h1");
    h1Col21.innerHTML = pasajero.edad + " años";
    col21.appendChild(h1Col21);

    row21 = document.createElement("div");
    row21.setAttribute("class", "row");

    col1Row21 = document.createElement("div");
    col1Row21.setAttribute("class", "col");
    col1Row21.setAttribute("id", "mailPerfil");
    h1Col1Row21 = document.createElement("h1");
    h1Col1Row21.innerHTML = pasajero.correo;
    col1Row21.appendChild(h1Col1Row21);

    col2Row21 = document.createElement("div");
    col2Row21.setAttribute("class", "col");
    col2Row21.setAttribute("id", "mailPerfil");
    h1Col2Row21 = document.createElement("h1");
    h1Col2Row21.innerHTML = pasajero.celular;
    col2Row21.appendChild(h1Col2Row21);
    row21.appendChild(col1Row21);
    row21.appendChild(col2Row21);

    row11.appendChild(col11);
    row11.appendChild(col21);

    divPerfil1.appendChild(row11);
    divPerfil1.appendChild(row21);

    mainRow1.appendChild(divImagen1);
    mainRow1.appendChild(divPerfil1);

    mainRow = document.createElement("div");
    mainRow.setAttribute("class", "row");

    divImagen = document.createElement("div");
    divImagen.setAttribute("class", "col-2");
    divImagen.setAttribute("id", "perfilImagen");

    imagen = document.createElement("img");
    imagen.setAttribute("src", vehiculo.foto);
    imagen.setAttribute("id", "imagenVehiculo");
    divImagen.appendChild(imagen);

    divPerfil = document.createElement("div");
    divPerfil.setAttribute("class", "col-7");
    divPerfil.setAttribute("id", "perfiles");

    row1 = document.createElement("div");
    row1.setAttribute("class", "row");

    col1 = document.createElement("div");
    col1.setAttribute("class", "col");
    h1Col1 = document.createElement("h1");
    h1Col1.innerHTML = "Placa: " + vehiculo.placa;
    col1.appendChild(h1Col1);

    col2 = document.createElement("div");
    col2.setAttribute("class", "col");
    h1Col2 = document.createElement("h1");
    h1Col2.innerHTML = "Tipo: " + vehiculo.tipo;
    col2.appendChild(h1Col2);

    row2 = document.createElement("div");
    row2.setAttribute("class", "row");

    col1Row2 = document.createElement("div");
    col1Row2.setAttribute("class", "col");
    col1Row2.setAttribute("id", "mailPerfil");
    h1Col1Row2 = document.createElement("h1");
    h1Col1Row2.innerHTML = "Modelo: " + vehiculo.modelo;
    col1Row2.appendChild(h1Col1Row2);

    row2.appendChild(col1Row2);

    row1.appendChild(col1);
    row1.appendChild(col2);

    divPerfil.appendChild(row1);
    divPerfil.appendChild(row2);

    mainRow.appendChild(divImagen);
    mainRow.appendChild(divPerfil);

    main.appendChild(mainRow1);
    main.appendChild(mainRow);
  } else {
    mainRow = document.createElement("div");
    mainRow.setAttribute("class", "row");

    divImagen = document.createElement("div");
    divImagen.setAttribute("class", "col-2");
    divImagen.setAttribute("id", "perfilImagen");

    imagen = document.createElement("img");
    imagen.setAttribute(
      "src",
      "https://upload.wikimedia.org/wikipedia/commons/d/d8/Emblem-person-blue.svg",
    );
    imagen.setAttribute("id", "imagenPerfil");
    divImagen.appendChild(imagen);

    divPerfil = document.createElement("div");
    divPerfil.setAttribute("class", "col-7");
    divPerfil.setAttribute("id", "perfiles");

    row1 = document.createElement("div");
    row1.setAttribute("class", "row");

    col1 = document.createElement("div");
    col1.setAttribute("class", "col");
    h1Col1 = document.createElement("h1");
    h1Col1.innerHTML = pasajero.nombre;
    col1.appendChild(h1Col1);

    col2 = document.createElement("div");
    col2.setAttribute("class", "col");
    h1Col2 = document.createElement("h1");
    h1Col2.innerHTML = pasajero.edad + " años";
    col2.appendChild(h1Col2);

    row2 = document.createElement("div");
    row2.setAttribute("class", "row");

    col1Row2 = document.createElement("div");
    col1Row2.setAttribute("class", "col");
    col1Row2.setAttribute("id", "mailPerfil");
    h1Col1Row2 = document.createElement("h1");
    h1Col1Row2.innerHTML = pasajero.correo;
    col1Row2.appendChild(h1Col1Row2);

    col2Row2 = document.createElement("div");
    col2Row2.setAttribute("class", "col");
    col2Row2.setAttribute("id", "mailPerfil");
    h1Col2Row2 = document.createElement("h1");
    h1Col2Row2.innerHTML = pasajero.celular;
    col2Row2.appendChild(h1Col2Row2);
    row2.appendChild(col1Row2);
    row2.appendChild(col2Row2);

    row1.appendChild(col1);
    row1.appendChild(col2);

    divPerfil.appendChild(row1);
    divPerfil.appendChild(row2);

    mainRow.appendChild(divImagen);
    mainRow.appendChild(divPerfil);

    main.appendChild(mainRow);
  }
}
