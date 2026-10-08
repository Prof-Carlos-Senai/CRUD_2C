const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('produto', {
    codProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nomeProduto: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    categoria: {
        type: DataTypes.ENUM('SOCIAL', 'CASUAL'),
        allowNull: false
    },
    precoUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    qtdeEstoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'produtos'
})

module.exports = Produto