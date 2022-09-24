"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_hira_probabilities", [
      {
        value: 1,
        name: "Frequent",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 2,
        name: "Often",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 3,
        name: "Likely",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 4,
        name: "Possible",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 5,
        name: "Rare",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_hira_probabilities", {}, null);
  },
};
