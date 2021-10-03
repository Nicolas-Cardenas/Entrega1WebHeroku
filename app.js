const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const reservaRouter = require("./routes/reservaRoute");
const mapaTrayectoRouter = require("./routes/mapaTrayectoRoute");
const conductorRouter = require("./routes/conductorRoute");
const pasajeroRouter = require("./routes/pasajeroRoute");
const mensajeRouter = require("./routes/mensajeRoute");
const calificacionRouter = require("./routes/calificacionRoute");
const viajeRouter = require("./routes/viajeRoute");
const paradaRouter = require("./routes/paradaRoute");
const tarjetaRouter = require("./routes/tarjetaRoute");
const pagoRouter = require("./routes/pagoRoute");
const ubicacionRouter = require("./routes/ubicacionRoute");
const vehiculoRouter = require("./routes/vehiculoRoute");

const loginRouter = require("./routes/login");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  next();
});

app.use("/", indexRouter);
app.use("/api/reservas", reservaRouter);
app.use("/api/mapaTrayectos", mapaTrayectoRouter);
app.use("/api/conductores", conductorRouter);
app.use("/api/pasajeros", pasajeroRouter);
app.use("/api/mensajes", mensajeRouter);
app.use("/api/calificaciones", calificacionRouter);
app.use("/api/viajes", viajeRouter);
app.use("/api/paradas", paradaRouter);
app.use("/api/tarjetas", tarjetaRouter);
app.use("/api/pagos", pagoRouter);
app.use("/api/ubicaciones", ubicacionRouter);
app.use("/api/vehiculos", vehiculoRouter);
app.use("/api", loginRouter);

module.exports = app;
