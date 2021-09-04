const jwt = require("jsonwebtoken");
const config = require("../jwt/config");

function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    //validar el usuario
    const mockedUsername = "admin";
    const mockedPassword = "password";

    //Autenticacion correcta
    if (username === mockedUsername && password === mockedPassword) {
      const token = jwt.sign({ username }, config.secret, { expiresIn: "24h" });
      res.send({
        success: true,
        message: "Autenticacion exitosa",
        token: token,
      });
    }
    //Autenticacion fallida
    else {
      res.send({
        success: false,
        message: "Autenticacion fallida",
      });
    }
  } else {
    res.send({
      success: false,
      message: "Envie las credenciales",
    });
  }
}

module.exports = login;
