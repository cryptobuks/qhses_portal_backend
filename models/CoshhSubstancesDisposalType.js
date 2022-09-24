"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoshhSubstancesDisposalType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoshhSubstancesDisposalType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CoshhSubstancesDisposalType",
      tableName: "qhses_coshh_substances_disposal_types",
    }
  );
  return CoshhSubstancesDisposalType;
};
