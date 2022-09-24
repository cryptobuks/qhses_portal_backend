"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EnvironmentalRecord extends Model {
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
      this.belongsTo(models.User, {
        as: "lastUpdateBy",
        foreignKey: "last_update_by_user_id",
      });
      this.belongsTo(models.Company, {
        as: "company",
        foreignKey: "company_id",
      });
      this.hasMany(models.EnvironmentalRecordAssessment, {
        as: "assessments",
        foreignKey: "record_id",
      });
    }
  }
  EnvironmentalRecord.init(
    {
      user_id: DataTypes.INTEGER,
      last_update_by_user_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
      eair_number: DataTypes.STRING,
      revision_number: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "EnvironmentalRecord",
      tableName: "qhses_environmental_records",
    }
  );
  return EnvironmentalRecord;
};
