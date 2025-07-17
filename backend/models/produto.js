const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Produto = sequelize.define('Produtos', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'imgs/product.png'
    }
}, {
    tableName: 'produtos',
    createdAt: 'data_criacao',
    updatedAt: false,
});

module.exports = Produto;