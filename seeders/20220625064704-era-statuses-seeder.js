"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_era_statuses", [
      {
        name: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "In Progress",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Closed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_era_statuses", {}, null);
  },
};
