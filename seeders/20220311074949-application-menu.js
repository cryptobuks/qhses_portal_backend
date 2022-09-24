"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_application_menus", [
      {
        application_id: 1,
        title: "Dashboard",
        route: "ncr/dashboard",
        antd_icon_name: "DashboardOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 1,
        title: "NCR Details",
        route: "ncr/records",
        antd_icon_name: "AppstoreAddOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 2,
        title: "Dashboard",
        route: "equipment-calibration/dashboard",
        antd_icon_name: "DashboardOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 2,
        title: "Calibrations",
        route: "equipment-calibration/records",
        antd_icon_name: "AppstoreAddOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 3,
        title: "Dashboard",
        route: "customer-survey/dashboard",
        antd_icon_name: "DashboardOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 3,
        title: "Surveys",
        route: "customer-survey/surveys",
        antd_icon_name: "FormOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 3,
        title: "Feedbacks",
        route: "customer-survey/feedbacks",
        antd_icon_name: "CreditCardOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 4,
        title: "Dashboard",
        route: "internal-audit/dashboard",
        antd_icon_name: "DashboardOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 4,
        title: "Schedule",
        route: "internal-audit/schedule",
        antd_icon_name: "ScheduleOutlined",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_application_menus", {}, null);
  },
};
