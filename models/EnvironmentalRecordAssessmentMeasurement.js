"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EnvironmentalRecordAssessmentMeasurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EnvironmentalRecordAssessmentMeasurement.init(
    {
      record_id: DataTypes.INTEGER,
      record_assessment_id: DataTypes.INTEGER,
      measurement: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "EnvironmentalRecordAssessmentMeasurement",
      tableName: "qhses_environmental_record_assessment_measurements",
    }
  );
  return EnvironmentalRecordAssessmentMeasurement;
};
