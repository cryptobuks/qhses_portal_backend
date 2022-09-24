"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_era_assessments", {
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
      company_id: {
        type: Sequelize.INTEGER,
      },
      date_raised: {
        type: Sequelize.DATE,
      },
      risk_type: {
        type: Sequelize.STRING,
      },
      risk_area: {
        type: Sequelize.STRING,
      },
      event: {
        type: Sequelize.STRING,
      },
      cause: {
        type: Sequelize.STRING,
      },
      consequences: {
        type: Sequelize.TEXT,
      },
      likelihood_id: {
        type: Sequelize.INTEGER,
      },
      consequence_id: {
        type: Sequelize.INTEGER,
      },
      action_id: {
        type: Sequelize.INTEGER,
      },
      plan: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      residual_likelihood_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      residual_consequence_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      methods: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      progress_reporting: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      responsible: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status_id: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
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
    await queryInterface.dropTable("qhses_era_assessments");
  },
};
