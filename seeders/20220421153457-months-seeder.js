"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_months", [
      {
        value: 1,
        code: "Jan",
        name: "January",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 2,
        code: "Feb",
        name: "February",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 3,
        code: "Mar",
        name: "March",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 4,
        code: "Apr",
        name: "April",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 5,
        code: "May",
        name: "May",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 6,
        code: "Jun",
        name: "June",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 7,
        code: "Jul",
        name: "July",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 8,
        code: "Aug",
        name: "August",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 9,
        code: "Sep",
        name: "September",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 10,
        code: "Oct",
        name: "October",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 11,
        code: "Nov",
        name: "November",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 12,
        code: "Dec",
        name: "December",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_months", {}, null);
  },
};
