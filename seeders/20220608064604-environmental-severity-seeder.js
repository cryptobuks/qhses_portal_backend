"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_environmental_severities", [
      {
        value: 1,
        name: "Insignificant",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 2,
        name: "Minor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 3,
        name: "Moderate",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 4,
        name: "Major",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 5,
        name: "Catastrophic",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "qhses_environmental_severities",
      {},
      null
    );
  },
};
