const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tellevodb", "", "", {
    dialect: "sqlite",
    storage: "./database/database.sqlite"
});

sequelize.authenticate().then(() => {

});

module.exports = sequelize;