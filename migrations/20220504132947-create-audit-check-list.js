"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_audit_check_lists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      audit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      audit_finding_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ncr_record_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      process: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      requirements: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      observations: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      submitted: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("qhses_audit_check_lists");
  },
};
