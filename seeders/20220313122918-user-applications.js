"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_user_applications", [
      {
        user_id: 1,
        application_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        application_role_id: 1,
      },
      {
        user_id: 1,
        application_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        application_role_id: 4,
      },
      {
        user_id: 1,
        application_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        application_role_id: 6,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_user_applications", {}, null);
  },
};
