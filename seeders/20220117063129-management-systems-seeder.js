"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_ncr_management_systems", [
      {
        name: "QHSEMS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Other/Statutory/Regulatory ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_ncr_management_systems", {}, null);
  },
};
