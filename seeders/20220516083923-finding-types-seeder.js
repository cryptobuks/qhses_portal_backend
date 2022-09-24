"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_finding_types", [
      {
        code: "OBS",
        name: "Observation",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "NCR",
        name: "Nonconformity",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_finding_types", {}, null);
  },
};
