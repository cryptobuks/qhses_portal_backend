"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "qhses_environmental_record_assessment_measurements",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        record_id: {
          type: Sequelize.INTEGER,
        },
        record_assessment_id: {
          type: Sequelize.INTEGER,
        },
        measurement: {
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
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(
      "qhses_environmental_record_assessment_measurements"
    );
  },
};
