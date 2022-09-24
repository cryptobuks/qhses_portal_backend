"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_coshh_exposure_routes", [
      {
        name: "Inhalation",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Skin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Eyes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ingestion",
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
    return queryInterface.bulkDelete("qhses_coshh_exposure_routes", {}, null);
  },
};
