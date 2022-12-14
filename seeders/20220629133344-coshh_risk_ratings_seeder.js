"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_coshh_risk_ratings", [
      {
        name: "High",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Medium",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Low",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_coshh_risk_ratings", {}, null);
  },
};
