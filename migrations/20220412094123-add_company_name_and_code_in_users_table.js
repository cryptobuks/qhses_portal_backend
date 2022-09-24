"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("qhses_users", "company_code", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("qhses_users", "company_name", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("qhses_users", "company_code"),
      queryInterface.removeColumn("qhses_users", "company_name"),
    ]);
  },
};
