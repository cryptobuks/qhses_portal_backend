"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_audit_findings", [
      {
        type_id: 1,
        create_ncr: 0,
        name: "Positive / Satisfactory",
        color_code: "#2ECC71",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        create_ncr: 0,
        name: "Area for Improvment",
        color_code: "#F1C40F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 1,
        create_ncr: 1,
        name: "Observation",
        color_code: "#F39C12",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_id: 2,
        create_ncr: 1,
        name: "Nonconformity",
        color_code: "#E74C3C",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_audit_findings", {}, null);
  },
};
