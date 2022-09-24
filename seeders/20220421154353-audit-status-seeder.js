"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_audit_statuses", [
      {
        code: "SCH",
        name: "Scheduled",
        color_code: "#F1C40F",
        antd_icon_name: "ScheduleOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ANS",
        name: "Audit Notification Sent",
        color_code: "#F1C40F",
        antd_icon_name: "NotificationOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ACC",
        name: "Audit Checklist Created",
        color_code: "#F1C40F",
        antd_icon_name: "FileDoneOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "COM",
        name: "Completed",
        color_code: "#2ECC71",
        antd_icon_name: "CheckCircleOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "DUE",
        name: "Ovedue",
        color_code: "#E74C3C",
        antd_icon_name: "FieldTimeOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_audit_statuses", {}, null);
  },
};
