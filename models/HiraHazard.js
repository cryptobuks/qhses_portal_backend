"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HiraHazard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HiraHazard.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HiraHazard",
      tableName: "qhses_hira_hazards",
    }
  );
  return HiraHazard;
};
