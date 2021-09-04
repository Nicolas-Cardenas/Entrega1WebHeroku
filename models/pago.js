const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Pago extends Model { }

const enums = {
  CREDITO: "credito",
  DEBITO: "debito",
  EFECTIVO: "efectivo"
};

Pago.init(
  {
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha:
    {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pendiente: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: enums,
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Pago",
  }
);

//Relaciones
//Pago.Viaje = Pago.belongsTo(Viaje);
//Pago.Tarjeta = Pago.hasOne(Tarjeta)

module.exports = Pago;
