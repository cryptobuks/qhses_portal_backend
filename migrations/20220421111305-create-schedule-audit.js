"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_audits", {
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
      year_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      month_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      audit_number: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      audit_for: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      audit_status_id: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      reminder_sent: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      previous_audit_follow_up: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      audit_evidence: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      other_facts_incidents: {
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
    await queryInterface.dropTable("qhses_audits");
  },
};
