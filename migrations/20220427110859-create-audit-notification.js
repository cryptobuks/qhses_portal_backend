"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_audit_notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      audit_id: {
        type: Sequelize.INTEGER,
      },
      audit_from_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      audit_to_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      scope_of_audit: {
        type: Sequelize.TEXT,
      },
      reference_documents: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("qhses_audit_notifications");
  },
};
