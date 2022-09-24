"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_user_application_menus", [
      {
        user_id: 1,
        application_id: 1,
        application_menu_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        application_id: 1,
        application_menu_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        application_id: 2,
        application_menu_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        application_id: 2,
        application_menu_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        application_id: 3,
        application_menu_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        application_id: 3,
        application_menu_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        application_id: 3,
        application_menu_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_user_application_menus", {}, null);
  },
};
