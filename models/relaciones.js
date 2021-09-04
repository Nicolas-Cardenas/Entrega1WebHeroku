const Viaje = require("./viaje");
const Pasajero = require("./pasajero");
const Conductor = require("./conductor");
const Calificacion = require("./calificacion");
const Pago = require("./pago");
const Parada = require("./parada");
const Tarjeta = require("./tarjeta");
const MapaTrayecto = require("./mapaTrayecto");
const Mensaje = require("./mensaje");
const Vehiculo = require("./vehiculo");
const Ubicacion = require("./ubicacion");
const Reserva = require("./reserva");
const sequelize = require("../lib/sequelize");

// Relaciones de reserva
Reserva.hasOne(Pago);
Reserva.belongsTo(Pasajero);
Reserva.belongsTo(Viaje);

// Relaciones de mapaTrayecto
MapaTrayecto.belongsTo(Viaje);

// Relaciones de Viaje
Viaje.hasMany(Reserva);
Viaje.hasMany(Pasajero);
Viaje.hasOne(MapaTrayecto);
Viaje.hasOne(Conductor);
Viaje.hasMany(Parada);
Viaje.hasMany(Mensaje, {
  foreignKey: "ViajeId",
});

// Relaciones de Pasajero
Pasajero.belongsToMany(Viaje, { through: "Pasajero_Viaje", timestamps: false });
Pasajero.hasMany(Mensaje, {
  foreignKey: "PasajeroId",
});
Pasajero.hasMany(Reserva);
Pasajero.hasOne(Tarjeta);
Pasajero.hasOne(Calificacion, {
  foreignKey: "PasajeroId",
});

// Relaciones de Conductor
Conductor.belongsTo(Viaje);
Conductor.hasOne(Vehiculo);
Conductor.hasOne(Calificacion, {
  foreignKey: "ConductorId",
});
Conductor.hasMany(Mensaje, {
  foreignKey: "ConductorId",
});

// Relaciones de Pago
Pago.belongsTo(Reserva);
Pago.belongsTo(Tarjeta);

// Relaciones de Parada
Parada.belongsTo(Viaje);

// Relaciones de Tarjeta
Tarjeta.belongsTo(Pasajero);
Tarjeta.hasMany(Pago);

// Relaciones de Mensaje
Mensaje.belongsTo(Pasajero);
Mensaje.belongsTo(Conductor);
Mensaje.belongsTo(Viaje);

// Relaciones de Calificacion
Calificacion.belongsTo(Conductor);
Calificacion.belongsTo(Pasajero);

// Relaciones de Vehiculo
Vehiculo.hasOne(Ubicacion);
Vehiculo.belongsTo(Conductor);

// Relaciones de Ubicacion
Ubicacion.belongsTo(Vehiculo);

sequelize.sync();

module.exports = {
  Reserva,
  Viaje,
  Pasajero,
  Conductor,
  Calificacion,
  Parada,
  Tarjeta,
  MapaTrayecto,
  Mensaje,
  Vehiculo,
  Ubicacion,
  Pago,
};
