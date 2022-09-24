"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoshhAssessmentHazardType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoshhAssessmentHazardType.init(
    {
      assessment_id: DataTypes.INTEGER,
      hazard_type_id: DataTypes.INTEGER,
      other_description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CoshhAssessmentHazardType",
      tableName: "qhses_coshh_assessment_hazard_types",
    }
  );
  return CoshhAssessmentHazardType;
};
