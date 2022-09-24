"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HiraRecordAssessmentEntity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HiraRecordAssessmentEntity.init(
    {
      record_id: DataTypes.INTEGER,
      record_assessment_id: DataTypes.INTEGER,
      entity_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HiraRecordAssessmentEntity",
      tableName: "qhses_hira_record_assessment_entities",
    }
  );
  return HiraRecordAssessmentEntity;
};
