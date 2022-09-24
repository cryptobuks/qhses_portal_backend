"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_emergency_drills", {
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
        allowNull: false,
      },
      type_id: {
        type: Sequelize.INTEGER,
      },
      status_id: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      drill_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shift_date_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      purpose: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      drill_coordinator: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      response_team_leader: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      response_team_members: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      traffic_controllers: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      drill_scenarios: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      staff_response_time: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      used_emergency_equipments: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      positive_notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      observation_points: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      general_observations: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      corrective_action_points: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      attendence_submitted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      submitted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
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
    await queryInterface.dropTable("qhses_emergency_drills");
  },
};
