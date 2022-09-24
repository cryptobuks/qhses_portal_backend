"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CalibrationFrequency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CalibrationFrequency.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CalibrationFrequency",
      tableName: "qhses_calibration_frequencies",
    }
  );
  return CalibrationFrequency;
};
