"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_emergency_drill_types", [
      {
        name: "COVID 19 - Medical Emergency Drill",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Earthquake Emergency Evacuation",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Medical Injury",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fire Evacuation",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_emergency_drill_types", {}, null);
  },
};
