const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Calificacion extends Model {}

Calificacion.init(
  {
    comentario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estrellas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Calificacion",
  },
);

module.exports = Calificacion;
