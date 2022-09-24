"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_ncr_areas", [
      {
        name: "Central Procurement",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Finance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Development",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Quality Assurance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_ncr_areas", {}, null);
  },
};
