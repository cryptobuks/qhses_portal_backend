"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HiraSeverity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HiraSeverity.init(
    {
      value: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HiraSeverity",
      tableName: "qhses_hira_severities",
    }
  );
  return HiraSeverity;
};
