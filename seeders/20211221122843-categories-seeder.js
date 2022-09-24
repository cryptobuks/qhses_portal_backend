"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_ncr_categories", [
      {
        Code: "CAR",
        name: "Corrective action",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Code: "CC",
        name: "Customer complaint",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_ncr_categories", {}, null);
  },
};
