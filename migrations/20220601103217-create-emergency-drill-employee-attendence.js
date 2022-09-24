"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "qhses_emergency_drill_employees_attendences",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        emergency_drill_id: {
          type: Sequelize.INTEGER,
        },
        employee_type: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        employee_id: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        employee_name: {
          type: Sequelize.STRING,
        },
        company_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        company_code: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        department_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        department_code: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        location_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        location_code: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        present: {
          type: Sequelize.BOOLEAN,
          defaultValue: 0,
        },
        out_of_office: {
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
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(
      "qhses_emergency_drill_employees_attendences"
    );
  },
};
