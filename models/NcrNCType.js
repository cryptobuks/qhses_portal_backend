"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NcrNCType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NcrNCType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NcrNCType",
      tableName: "qhses_ncr_ncTypes",
    }
  );
  return NcrNCType;
};
