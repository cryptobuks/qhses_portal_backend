"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HiraProbability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HiraProbability.init(
    {
      value: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HiraProbability",
      tableName: "qhses_hira_probabilities",
    }
  );
  return HiraProbability;
};
