'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class atividades extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            atividades.belongsTo(models.clientes, {
                foreignKey: "cliente_id",
                as: "clienteAtividades",
            });
        }
    }
    atividades.init({
        situacao: DataTypes.STRING,
        providencias: DataTypes.STRING,
        data: DataTypes.DATEONLY
    }, {
        sequelize,
        modelName: 'atividades',
    });
    return atividades;
};
