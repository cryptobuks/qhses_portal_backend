"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoshhHazardType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoshhHazardType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CoshhHazardType",
      tableName: "qhses_coshh_hazard_types",
    }
  );
  return CoshhHazardType;
};
