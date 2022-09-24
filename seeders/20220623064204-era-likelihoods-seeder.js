"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_era_likelihoods", [
      {
        value: 1,
        name: "Rare",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 2,
        name: "Unlikely",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 3,
        name: "Possible",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 4,
        name: "Likely",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 5,
        name: "Almost Certain",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_era_likelihoods", {}, null);
  },
};
