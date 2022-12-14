"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_applications", [
      {
        title: "NCR Analysis",
        route: "ncr",
        antd_icon_name: "SafetyOutlined",
        users_table_name: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Equipment Calibration",
        route: "equipment-calibration",
        antd_icon_name: "AimOutlined",
        users_table_name: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Customer Survey",
        route: "customer-survey",
        antd_icon_name: "FileDoneOutlined",
        users_table_name: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Internal Audit",
        route: "internal-audit",
        antd_icon_name: "AuditOutlined",
        users_table_name: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_applications", {}, null);
  },
};
