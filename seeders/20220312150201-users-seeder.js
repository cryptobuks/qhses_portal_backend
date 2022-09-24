"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_users", [
      {
        role_id: 1,
        emp_id: "00000247",
        name: "Satish Kumar",
        email: "sathish.kumar@ali-sons.com",
        password:
          "$2a$12$IbvzYOEDiqpyvkrIklrJ4evLGq9VR5bdTJWhlUfJuSWYp.7qx/tXu",
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
