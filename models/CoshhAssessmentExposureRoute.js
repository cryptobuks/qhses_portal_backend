"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoshhAssessmentExposureRoute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoshhAssessmentExposureRoute.init(
    {
      assessment_id: DataTypes.INTEGER,
      exposure_route_id: DataTypes.INTEGER,
      other_description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CoshhAssessmentExposureRoute",
      tableName: "qhses_coshh_assessment_exposure_routes",
    }
  );
  return CoshhAssessmentExposureRoute;
};
