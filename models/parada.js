const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Parada extends Model { }
Parada.init(
    {
        ciudad:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coordenadaX: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        coordenadaY: {
            type: DataTypes.FLOAT
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Parada",
    }
);

module.exports = Parada;