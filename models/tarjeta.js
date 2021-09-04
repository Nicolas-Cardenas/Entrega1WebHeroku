const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Tarjeta extends Model { }

Tarjeta.init(
  {
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaExpiracion:
    {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cvv:
    {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pais:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    banco:
    {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Tarjeta",
  }
);

//Relaciones
//Tarjeta.Pasajero = Tarjeta.belongsTo(Pasajero);
//Tarjeta.Pago = Tarjeta.belongsTo(Pago)

module.exports = Tarjeta;
