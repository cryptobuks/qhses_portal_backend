"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_hira_record_assessments", {
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
      record_id: {
        type: Sequelize.INTEGER,
      },
      hazard_id: {
        type: Sequelize.INTEGER,
      },
      risks: {
        type: Sequelize.STRING,
      },
      probability_id: {
        type: Sequelize.INTEGER,
      },
      severity_id: {
        type: Sequelize.INTEGER,
      },
      residual_probability_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      residual_severity_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      remarks: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("qhses_hira_record_assessments");
  },
};
