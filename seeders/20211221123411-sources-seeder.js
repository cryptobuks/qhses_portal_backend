"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_ncr_sources", [
      {
        Code: "INT",
        name: "Internal Audit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Code: "EXT",
        name: "External Audit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Code: "EXT",
        name: "Supplier Audit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Code: "INT",
        name: "ADHOC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_ncr_sources", {}, null);
  },
};
