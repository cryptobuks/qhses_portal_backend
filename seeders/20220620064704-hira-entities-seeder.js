"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_hira_entities", [
      {
        code: "P",
        name: "People",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "A",
        name: "Assets",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "E",
        name: "Environment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "R",
        name: "Reputation",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_hira_entities", {}, null);
  },
};
