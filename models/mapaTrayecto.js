const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class MapaTrayecto extends Model {}

MapaTrayecto.init(
  {
    ubicacionInicial: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ubicacionFinal: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    distancia: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "MapaTrayecto",
  },
);

module.exports = MapaTrayecto;
