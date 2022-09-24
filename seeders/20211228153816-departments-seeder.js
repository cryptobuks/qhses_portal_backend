"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_departments", [
      {
        code: "DEPT1",
        name: "Department 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "DEPT2",
        name: "Department 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "DEPT3",
        name: "Department 3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "DEPT4",
        name: "Department 4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "DEPT5",
        name: "Department 5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_departments", {}, null);
  },
};
