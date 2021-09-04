const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Ubicacion extends Model { }

Ubicacion.init(
  {
    coordenadaX: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coordenadaY: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },


  {
    sequelize,
    timestamps: false,
    modelName: "Ubicacion",
  }
);

module.exports = Ubicacion;