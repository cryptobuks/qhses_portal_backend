"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoshhAssessmentRiskPerson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoshhAssessmentRiskPerson.init(
    {
      assessment_id: DataTypes.INTEGER,
      risk_person_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CoshhAssessmentRiskPerson",
      tableName: "qhses_coshh_assessment_risk_persons",
    }
  );
  return CoshhAssessmentRiskPerson;
};
