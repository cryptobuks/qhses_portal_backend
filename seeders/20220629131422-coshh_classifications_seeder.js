"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_coshh_classifications", [
      {
        name: "Toxic",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Oxidising",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gas Under Pressure",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Harmful/ Irritant",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Flammable",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Carcinogen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Corrosive",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Explosives",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dangerous for the environment",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_coshh_classifications", {}, null);
  },
};
