"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_calibration_frequencies", [
      {
        name: "Daily",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Biweekly",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Weekly",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bimonthly",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Monthly",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Quarterly",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Biyearly",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Yearly",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_calibration_frequencies", {}, null);
  },
};
