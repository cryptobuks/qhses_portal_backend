"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_ncr_statuses", [
      {
        name: "New",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Corrective Action Submitted",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "In-Progress",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Overdue",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Awaiting Closure",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Closed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Revise & Resubmit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Draft",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_ncr_statuses", {}, null);
  },
};
