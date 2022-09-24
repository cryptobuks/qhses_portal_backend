"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoshhAssessment extends Model {
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
      this.belongsTo(models.Company, {
        as: "company",
        foreignKey: "company_id",
      });
      this.belongsTo(models.Department, {
        as: "department",
        foreignKey: "department_id",
      });

      this.hasMany(models.CoshhAssessmentRiskPerson, {
        as: "assessmentRiskPersons",
        foreignKey: "assessment_id",
      });
      this.hasMany(models.CoshhAssessmentClassification, {
        as: "assessmentClassifications",
        foreignKey: "assessment_id",
      });
      this.hasMany(models.CoshhAssessmentHazardType, {
        as: "assessmentHazardTypes",
        foreignKey: "assessment_id",
      });
      this.hasMany(models.CoshhAssessmentExposureRoute, {
        as: "assessmentExposureRoutes",
        foreignKey: "assessment_id",
      });
      this.hasMany(models.CoshhAssessmentProtectiveEquipment, {
        as: "assessmentProtectiveEquipments",
        foreignKey: "assessment_id",
      });
      this.hasMany(models.CoshhAssessmentSubstanceDisposalType, {
        as: "assessmentSubstancesDisposalTypes",
        foreignKey: "assessment_id",
      });

      this.belongsToMany(models.CoshhRiskPerson, {
        as: "riskPersons",
        foreignKey: "assessment_id",
        otherKey: "risk_person_id",
        through: models.CoshhAssessmentRiskPerson,
      });
      this.belongsToMany(models.CoshhClassification, {
        as: "classifications",
        foreignKey: "assessment_id",
        otherKey: "classification_id",
        through: models.CoshhAssessmentClassification,
      });
      this.belongsToMany(models.CoshhHazardType, {
        as: "hazardTypes",
        foreignKey: "assessment_id",
        otherKey: "hazard_type_id",
        through: models.CoshhAssessmentHazardType,
      });
      this.belongsToMany(models.CoshhExposureRoute, {
        as: "exposureRoutes",
        foreignKey: "assessment_id",
        otherKey: "exposure_route_id",
        through: models.CoshhAssessmentExposureRoute,
      });
      this.belongsToMany(models.CoshhProtectiveEquipment, {
        as: "protectiveEquipments",
        foreignKey: "assessment_id",
        otherKey: "protective_equipment_id",
        through: models.CoshhAssessmentProtectiveEquipment,
      });
      this.belongsToMany(models.CoshhSubstancesDisposalType, {
        as: "substancesDisposalTypes",
        foreignKey: "assessment_id",
        otherKey: "substance_disposal_type_id",
        through: models.CoshhAssessmentSubstanceDisposalType,
      });
      this.belongsTo(models.CoshhRiskRating, {
        as: "healthRiskRating",
        foreignKey: "health_risk_rating_id",
      });
      this.belongsTo(models.CoshhRiskRating, {
        as: "environmentRiskRating",
        foreignKey: "environment_risk_rating_id",
      });
      this.belongsTo(models.CoshhRiskRating, {
        as: "riskRating",
        foreignKey: "risk_rating_id",
      });
    }
  }
  CoshhAssessment.init(
    {
      user_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
      department_id: DataTypes.INTEGER,
      assessment_number: DataTypes.STRING,
      product_name: DataTypes.STRING,
      process: DataTypes.TEXT,
      process_location: DataTypes.STRING,
      process_substance_and_manufacturer: DataTypes.TEXT,
      workplace_exposure_limits: DataTypes.STRING,
      health_risk_rating_id: DataTypes.INTEGER,
      environment_risk_rating_id: DataTypes.TEXT,
      health_surveillance_required: DataTypes.BOOLEAN,
      first_aid_measures: DataTypes.TEXT,
      storage: DataTypes.TEXT,
      exposure_controlled: DataTypes.BOOLEAN,
      risk_rating_id: DataTypes.INTEGER,
      document_name: DataTypes.STRING,
      document_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.document_name
            ? `${process.env.BASE_URL}/public/files/coshh_documents/${this.document_name}`
            : null;
        },
        set(value) {
          throw new Error("Do not try to set the `documentUrl` value!");
        },
      },
    },
    {
      sequelize,
      modelName: "CoshhAssessment",
      tableName: "qhses_coshh_assessments",
    }
  );
  return CoshhAssessment;
};
