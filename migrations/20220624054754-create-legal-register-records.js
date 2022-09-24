"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_legal_register_records", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      last_update_by_user_id: {
        type: Sequelize.INTEGER,
      },
      year_id: {
        type: Sequelize.INTEGER,
      },
      legal_other_references: {
        type: Sequelize.STRING,
      },
      activity: {
        type: Sequelize.TEXT,
      },
      legal_other_requirements: {
        type: Sequelize.STRING,
      },
      reference_documents: {
        type: Sequelize.STRING,
      },
      responsible: {
        type: Sequelize.STRING,
      },
      remarks: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("qhses_legal_register_records");
  },
};
