"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_calibration_records", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      owner_id: {
        type: Sequelize.INTEGER,
      },
      // equipment_id: {
      //   type: Sequelize.STRING,
      // },
      equipment_asset_number: {
        type: Sequelize.STRING,
      },
      instrument_description: {
        type: Sequelize.STRING,
      },
      referance_standard: {
        type: Sequelize.STRING,
      },
      manufacturer: {
        type: Sequelize.STRING,
      },
      instrument_serial_number: {
        type: Sequelize.STRING,
      },
      range: {
        type: Sequelize.STRING,
      },
      accuracy: {
        type: Sequelize.STRING,
      },
      calibration_frequency_id: {
        type: Sequelize.INTEGER,
      },
      calibration_date: {
        type: Sequelize.DATE,
      },
      calibration_due_date: {
        type: Sequelize.DATE,
      },
      certificate_number: {
        type: Sequelize.STRING,
      },
      certification_attachment: {
        type: Sequelize.STRING,
      },
      remarks: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("qhses_calibration_records");
  },
};
