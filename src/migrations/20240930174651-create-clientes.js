'use strict';
/** @type {import('sequelize-cli/types').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('clientes', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUID
            },
            nome: {
                type: Sequelize.STRING
            },
            gerente: {
                type: Sequelize.STRING
            },
            telefone: {
                type: Sequelize.STRING
            },
            situacao: {
                type: Sequelize.STRING
            },
            providencias: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('clientes');
    }
};
