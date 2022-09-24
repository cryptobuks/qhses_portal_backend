"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EraConsequence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EraConsequence.init(
    {
      value: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EraConsequence",
      tableName: "qhses_era_consequences",
    }
  );
  return EraConsequence;
};
