"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "qhses_audit_notification_reference_documents",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        audit_id: {
          type: Sequelize.INTEGER,
        },
        audit_notification_id: {
          type: Sequelize.INTEGER,
        },
        document_name: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(
      "qhses_audit_notification_reference_documents"
    );
  },
};
