"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_ncr_corrective_action_plans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ncr_record_id: {
        type: Sequelize.INTEGER,
      },
      responsible_user_id: {
        type: Sequelize.INTEGER,
      },
      target_date: {
        type: Sequelize.DATE,
      },
      days: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      closing_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      closing_remarks: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "OPEN",
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
    await queryInterface.dropTable("qhses_ncr_corrective_action_plans");
  },
};
