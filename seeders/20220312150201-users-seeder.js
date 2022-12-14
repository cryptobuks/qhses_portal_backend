"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_users", [
      {
        role_id: 1,
        emp_id: "00000247",
        name: "Admin Admin",
        email: "admin@gmail.com",
        password:
          "$2a$12$2VvC7TVwqRO/5hVWWg8lXOMJN42ulL0HsQ4xWZb00bnhxi3SWQrLO",
        designation: "test designation",
        department: "test department",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 1,
        emp_id: "00000247",
        name: "Satish Kumar",
        email: "sathish.kumar@ali-sons.com",
        password:
          "$2a$12$2VvC7TVwqRO/5hVWWg8lXOMJN42ulL0HsQ4xWZb00bnhxi3SWQrLO",
        designation: "test designation",
        department: "test department",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_users", {}, null);
  },
};
