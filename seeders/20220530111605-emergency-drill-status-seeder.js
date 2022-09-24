"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_emergency_drill_statuses", [
      {
        code: "SCH",
        name: "Scheduled",
        color_code: "#F1C40F",
        antd_icon_name: "ScheduleOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "NTS",
        name: "Notification Sent",
        color_code: "#F1C40F",
        antd_icon_name: "NotificationOutlined",
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
        code: "COL",
        name: "Closed",
        color_code: "#EBEBEB",
        antd_icon_name: "IssuesCloseOutlined",
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
    return queryInterface.bulkDelete(
      "qhses_emergency_drill_statuses",
      {},
      null
    );
  },
};
