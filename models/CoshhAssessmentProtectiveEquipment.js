"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoshhAssessmentProtectiveEquipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoshhAssessmentProtectiveEquipment.init(
    {
      assessment_id: DataTypes.INTEGER,
      protective_equipment_id: DataTypes.INTEGER,
      other_description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CoshhAssessmentProtectiveEquipment",
      tableName: "qhses_coshh_assessment_protective_equipments",
    }
  );
  return CoshhAssessmentProtectiveEquipment;
};
