"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmergencyDrillType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmergencyDrillType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EmergencyDrillType",
      tableName: "qhses_emergency_drill_types",
    }
  );
  return EmergencyDrillType;
};
