"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "qhses_emergency_drill_notification_to_emails",
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
        emergency_drill_notification_id: {
          type: Sequelize.INTEGER,
        },
        to_email_user_id: {
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
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(
      "qhses_emergency_drill_notification_to_emails"
    );
  },
};
