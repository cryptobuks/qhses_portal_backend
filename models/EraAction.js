"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EraAction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EraAction.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EraAction",
      tableName: "qhses_era_actions",
    }
  );
  return EraAction;
};
