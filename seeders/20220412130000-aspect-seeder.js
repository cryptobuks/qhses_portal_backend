"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_aspects", [
      {
        title: "Corporate Governance and Strategic Planning & Development",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Finance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Business Development & Marketing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Legal & Contractual Compliance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Information Technology",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Human Resources",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "QHSE Awareness & Compliance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Responsiveness to Requests / Inquiries",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Communication Effectiveness",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Overall Satisfaction",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_aspects", {}, null);
  },
};
