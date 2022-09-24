"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("qhses_email_messages", {
      row_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      msg_to: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      msg_cc: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      msg_subject: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      msgbody: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_send: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      msg_group: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      meeting_location: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      meeting_from: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      meeting_to: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      scheduled_to: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      send_on: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      msg_Attachment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      msg_Attachment1: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      msg_Attachment2: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      msg_Logo: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      msg_Footer: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      EmailType: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      Process_flag: {
        type: Sequelize.STRING(1),
        allowNull: true,
      },
      msgfooter: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      Imagepath: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      created_on: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("qhses_email_messages");
  },
};
