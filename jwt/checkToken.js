const jwt = require("jsonwebtoken");
const config = require("./config");

function checkToken(req, res, next) {
  //Obtencion del token
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  //Si el token existe
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    // Si existe algún valor para el token, se analiza. de lo contrario, un mensaje de error es retornado
    jwt.verify(token, config.secret, (err, decoded) => {
      // Si no pasa la validación, un mensaje de error es retornado
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    //Si no se proporciona el token
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
}

module.exports = checkToken;
