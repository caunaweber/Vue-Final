const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("Usuarios",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 50],
            },
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100],
            },
        },
    },
    {
        tableName: "usuarios",
        timestamps: false,
        underscored: true,
    }
);

module.exports = User;
