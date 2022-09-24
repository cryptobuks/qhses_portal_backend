"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_coshh_risk_persons", [
      {
        name: "Employees",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sub-contractors",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Public",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_coshh_risk_persons", {}, null);
  },
};
