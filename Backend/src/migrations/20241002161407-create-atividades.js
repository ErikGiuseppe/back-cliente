'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('atividades', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUID
            },
            situacao: {
                type: Sequelize.STRING
            },
            providencias: {
                type: Sequelize.STRING
            },
            data: {
                type: Sequelize.DATEONLY
            },
            cliente_id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: { model: "clientes", key: "id" },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
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
        await queryInterface.dropTable('atividades');
    }
};
