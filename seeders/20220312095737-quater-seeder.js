"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_quaters", [
      {
        quater_name: "Quarter1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        quater_name: "Quarter2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        quater_name: "Quarter3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_quaters", {}, null);
  },
};
