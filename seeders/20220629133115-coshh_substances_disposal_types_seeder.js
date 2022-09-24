"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_coshh_substances_disposal_types", [
      {
        name: "Skip",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Return to Depot",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Return to Supplier",
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
      "qhses_coshh_substances_disposal_types",
      {},
      null
    );
  },
};
