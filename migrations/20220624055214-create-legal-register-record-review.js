"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_legal_register_Record_reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      register_record_id: {
        type: Sequelize.INTEGER,
      },
      quarter_id: {
        type: Sequelize.INTEGER,
      },
      review_done: {
        type: Sequelize.BOOLEAN,
      },
      remarks: {
        type: Sequelize.TEXT,
      },
      expiry_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("qhses_legal_register_Record_reviews");
  },
};
