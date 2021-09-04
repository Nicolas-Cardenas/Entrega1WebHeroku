const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Reserva extends Model {}

Reserva.init(
  {
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Reserva",
  },
);

module.exports = Reserva;
