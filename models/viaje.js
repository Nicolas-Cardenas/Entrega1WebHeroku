const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Viaje extends Model {}

Viaje.init(
  {
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tiempo: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    terminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    numCupos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lleno: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    conductorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Viaje",
  },
);

module.exports = Viaje;
