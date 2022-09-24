"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_years", [
      {
        year: "2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        year: "2021",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        year: "2022",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        year: "2023",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_years", {}, null);
  },
};
