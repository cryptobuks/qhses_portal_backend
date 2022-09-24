"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_ncr_records", {
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
      owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      area_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      supplier: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      source_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ncr_number: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ncr_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      nc_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      management_system_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      root_cause: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      correction_action: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      verification_effectiveness: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        comment: "1 for Satisfactory, 0 for Not Satisfactory",
      },
      closing_remarks: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status_id: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      finding_type_id: {
        type: Sequelize.INTEGER,
        defaultValue: 2,
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
    await queryInterface.dropTable("qhses_ncr_records");
  },
};
