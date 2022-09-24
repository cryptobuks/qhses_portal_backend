"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NcrManagementSystem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NcrManagementSystem.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NcrManagementSystem",
      tableName: "qhses_ncr_management_systems",
    }
  );
  return NcrManagementSystem;
};
