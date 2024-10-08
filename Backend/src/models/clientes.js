'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class clientes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            clientes.hasMany(models.atividades, {
                foreignKey: "cliente_id",
                as: "atividadesCliente",
            });
        }
    }
    clientes.init({
        nome: DataTypes.STRING,
        gerente: DataTypes.STRING,
        telefone: DataTypes.STRING,
        status: DataTypes.STRING,
        cpf: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'clientes',
    });
    return clientes;
};
