"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_locations", [
      {
        code: "ASM001",
        name: "ASMEF - Main Yard",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ASC001",
        name: "ASC - Project Site 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ASC002",
        name: "ASC - Project Site 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ASC003",
        name: "ASMEF - Project 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_locations", {}, null);
  },
};
