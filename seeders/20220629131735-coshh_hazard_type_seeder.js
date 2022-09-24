"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_coshh_hazard_types", [
      {
        name: "Gas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vapour",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mist",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fume",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dust",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Liquid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Solid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Other",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_coshh_hazard_types", {}, null);
  },
};
