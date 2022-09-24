"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HiraRecordAssessment extends Model {
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
      this.belongsTo(models.HiraHazard, {
        as: "hazard",
        foreignKey: "hazard_id",
      });
      this.belongsTo(models.HiraProbability, {
        as: "probability",
        foreignKey: "probability_id",
      });
      this.belongsTo(models.HiraSeverity, {
        as: "severity",
        foreignKey: "severity_id",
      });
      this.belongsTo(models.HiraProbability, {
        as: "residualProbability",
        foreignKey: "residual_probability_id",
      });
      this.belongsTo(models.HiraSeverity, {
        as: "residualSeverity",
        foreignKey: "residual_severity_id",
      });
      this.hasMany(models.HiraRecordAssessmentMeasurement, {
        as: "measurements",
        foreignKey: "record_assessment_id",
      });

      this.hasMany(models.HiraRecordAssessmentEntity, {
        as: "entityIds",
        foreignKey: "record_assessment_id",
      });

      this.belongsToMany(models.HiraEntity, {
        as: "entities",
        foreignKey: "record_assessment_id",
        otherKey: "entity_id",
        through: models.HiraRecordAssessmentEntity,
      });
    }
  }
  HiraRecordAssessment.init(
    {
      user_id: DataTypes.INTEGER,
      last_update_by_user_id: DataTypes.INTEGER,
      record_id: DataTypes.INTEGER,
      hazard_id: DataTypes.INTEGER,
      risks: DataTypes.STRING,
      probability_id: DataTypes.INTEGER,
      severity_id: DataTypes.INTEGER,
      residual_probability_id: DataTypes.INTEGER,
      residual_severity_id: DataTypes.INTEGER,
      remarks: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "HiraRecordAssessment",
      tableName: "qhses_hira_record_assessments",
    }
  );
  return HiraRecordAssessment;
};
