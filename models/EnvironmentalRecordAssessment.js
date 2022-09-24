"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EnvironmentalRecordAssessment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id",
      });
      this.belongsTo(models.User, {
        as: "lastUpdateBy",
        foreignKey: "last_update_by_user_id",
      });
      this.belongsTo(models.EnvironmentalActivity, {
        as: "activity",
        foreignKey: "activity_id",
      });
      this.belongsTo(models.EnvironmentalProbability, {
        as: "probability",
        foreignKey: "probability_id",
      });
      this.belongsTo(models.EnvironmentalSeverity, {
        as: "severity",
        foreignKey: "severity_id",
      });
      this.belongsTo(models.EnvironmentalProbability, {
        as: "residualProbability",
        foreignKey: "residual_probability_id",
      });
      this.belongsTo(models.EnvironmentalSeverity, {
        as: "residualSeverity",
        foreignKey: "residual_severity_id",
      });
      this.hasMany(models.EnvironmentalRecordAssessmentMeasurement, {
        as: "measurements",
        foreignKey: "record_assessment_id",
      });
    }
  }
  EnvironmentalRecordAssessment.init(
    {
      record_id: DataTypes.INTEGER,
      activity_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      last_update_by_user_id: DataTypes.INTEGER,
      aspect: DataTypes.STRING,
      impact: DataTypes.STRING,
      probability_id: DataTypes.INTEGER,
      severity_id: DataTypes.INTEGER,
      residual_probability_id: DataTypes.INTEGER,
      residual_severity_id: DataTypes.INTEGER,
      remarks: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "EnvironmentalRecordAssessment",
      tableName: "qhses_environmental_record_assessments",
    }
  );
  return EnvironmentalRecordAssessment;
};
