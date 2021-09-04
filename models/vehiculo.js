const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Vehiculo extends Model { }

Vehiculo.init(
  {
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: false,
    },


  },
  {
    sequelize,
    timestamps: false,
    modelName: "Vehiculo",
  }
);

module.exports = Vehiculo;