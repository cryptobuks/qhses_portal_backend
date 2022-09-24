"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_era_actions", [
      {
        name: "Avoid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Reduce",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Share",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Transfer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Accept",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_era_actions", {}, null);
  },
};
