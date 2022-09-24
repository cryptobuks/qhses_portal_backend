"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "qhses_user_applications",
        "application_role_id",
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        "qhses_user_applications",
        "application_role_id"
      ),
    ]);
  },
};
