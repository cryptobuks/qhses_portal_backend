"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_ncr_record_documents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ncr_record_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ncr_corrective_action_plan_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      uploaded_by: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("qhses_ncr_record_documents");
  },
};
