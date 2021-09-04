const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Pasajero extends Model { }

Pasajero.init(
  {
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    celular: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "No es una dirección de correo electrónico válida.",
        },
      },
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Pasajero",
    instanceMethods: {
      generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
  },
);

module.exports = Pasajero;