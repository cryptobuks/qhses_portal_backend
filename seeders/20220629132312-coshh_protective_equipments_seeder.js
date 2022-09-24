"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_coshh_protective_equipments", [
      {
        name: "Dust mask",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Visor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Respirator",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Goggles",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gloves",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Overalls",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Footwear",
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
    return queryInterface.bulkDelete(
      "qhses_coshh_protective_equipments",
      {},
      null
    );
  },
};
