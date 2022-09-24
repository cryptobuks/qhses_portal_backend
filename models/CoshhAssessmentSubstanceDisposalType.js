"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoshhAssessmentSubstanceDisposalType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoshhAssessmentSubstanceDisposalType.init(
    {
      assessment_id: DataTypes.INTEGER,
      substance_disposal_type_id: DataTypes.INTEGER,
      other_description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CoshhAssessmentSubstanceDisposalType",
      tableName: "qhses_coshh_assessment_substance_disposal_types",
    }
  );
  return CoshhAssessmentSubstanceDisposalType;
};
