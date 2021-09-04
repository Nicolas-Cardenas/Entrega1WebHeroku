const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Mensaje extends Model {}

Mensaje.init(
  {
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Mensaje",
  },
);

module.exports = Mensaje;
