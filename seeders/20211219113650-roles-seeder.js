"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_roles", [
      {
        title: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_roles", {}, null);
  },
};
