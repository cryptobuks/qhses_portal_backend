"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_ncr_ncTypes", [
      {
        name: "Product",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Process",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "System",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_ncr_ncTypes", {}, null);
  },
};
