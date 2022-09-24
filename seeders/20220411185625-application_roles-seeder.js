"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_application_roles", [
      {
        application_id: 1,
        name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 1,
        name: "HSE_COORDINATOR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 1,
        name: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 2,
        name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 2,
        name: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 3,
        name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 3,
        name: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 4,
        name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        application_id: 4,
        name: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_application_roles", {}, null);
  },
};
