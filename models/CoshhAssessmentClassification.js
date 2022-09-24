"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoshhAssessmentClassification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoshhAssessmentClassification.init(
    {
      assessment_id: DataTypes.INTEGER,
      classification_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CoshhAssessmentClassification",
      tableName: "qhses_coshh_assessment_classifications",
    }
  );
  return CoshhAssessmentClassification;
};
