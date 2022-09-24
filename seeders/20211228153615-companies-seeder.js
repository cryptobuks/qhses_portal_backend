"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("qhses_companies", [
      {
        code: "ASH",
        name: "Ali & Sons Holding LLC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ASCC",
        name: "Ali & Sons Contracting LLC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ABKI",
        name: "ABK Investments",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ASCI",
        name: "A&S Contracting Interiors",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ABKL",
        name: "ABK Investments LLC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "MHTD",
        name: "Muhur House Trading",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ASMEF",
        name: "Ali & Sons Marine Engineering Factory - Sole Proprietorship LLC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ASOS",
        name: "Ali & Sons Oil and Gas LLC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ASRE",
        name: "Ali & Sons Real Estate",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ASMD",
        name: "Ali & Sons Motors",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "AMWJ",
        name: "Amwaj Jewelery",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ERAC",
        name: "Eurostar Rent a Car",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "EAC",
        name: "Emarat Aloula Contracting",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "IEM",
        name: "Inter Emirates Motors",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "MRSL",
        name: "MaxRock Spectrum",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "SLBF",
        name: "Spectrum Light Block",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ROAS",
        name: "Rosetti Ali & Sons LLC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "ASOEM",
        name: "Ali & Sons Oilfield Equipment Manufacturing - Sole Proprietorship LLC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "EAI",
        name: "Emarat Aloula Industries",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("qhses_companies", {}, null);
  },
};
