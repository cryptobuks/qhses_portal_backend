"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EnvironmentalActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EnvironmentalActivity.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EnvironmentalActivity",
      tableName: "qhses_environmental_activities",
    }
  );
  return EnvironmentalActivity;
};
