"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmergencyDrillStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmergencyDrillStatus.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      color_code: DataTypes.STRING,
      antd_icon_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EmergencyDrillStatus",
      tableName: "qhses_emergency_drill_statuses",
    }
  );
  return EmergencyDrillStatus;
};
