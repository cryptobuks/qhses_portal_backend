"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_coshh_assessments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      company_id: {
        type: Sequelize.INTEGER,
      },
      department_id: {
        type: Sequelize.INTEGER,
      },
      assessment_number: {
        type: Sequelize.STRING,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      process: {
        type: Sequelize.TEXT,
      },
      process_location: {
        type: Sequelize.STRING,
      },
      process_substance_and_manufacturer: {
        type: Sequelize.TEXT,
      },
      workplace_exposure_limits: {
        type: Sequelize.STRING,
      },
      health_risk_rating_id: {
        type: Sequelize.INTEGER,
      },
      environment_risk_rating_id: {
        type: Sequelize.INTEGER,
      },
      health_surveillance_required: {
        type: Sequelize.BOOLEAN,
      },
      first_aid_measures: {
        type: Sequelize.TEXT,
      },
      storage: {
        type: Sequelize.TEXT,
      },
      exposure_controlled: {
        type: Sequelize.BOOLEAN,
      },
      risk_rating_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("qhses_coshh_assessments");
  },
};
