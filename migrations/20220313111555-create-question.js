"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_csr_questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      survey_id: {
        type: Sequelize.INTEGER,
      },
      question_description: {
        type: Sequelize.STRING,
      },
      question_aspect: {
        type: Sequelize.STRING,
      },
      rating_text_1: {
        type: Sequelize.STRING,
      },
      rating_text_2: {
        type: Sequelize.STRING,
      },
      rating_text_3: {
        type: Sequelize.STRING,
      },
      rating_text_4: {
        type: Sequelize.STRING,
      },
      rating_text_5: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("qhses_csr_questions");
  },
};
