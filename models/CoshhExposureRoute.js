"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoshhExposureRoute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoshhExposureRoute.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CoshhExposureRoute",
      tableName: "qhses_coshh_exposure_routes",
    }
  );
  return CoshhExposureRoute;
};
