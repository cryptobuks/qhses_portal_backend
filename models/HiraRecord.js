"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HiraRecord extends Model {
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
      this.hasMany(models.HiraRecordAssessment, {
        as: "assessments",
        foreignKey: "record_id",
      });
    }
  }
  HiraRecord.init(
    {
      user_id: DataTypes.INTEGER,
      last_update_by_user_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
      hira_number: DataTypes.STRING,
      revision_number: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "HiraRecord",
      tableName: "qhses_hira_records",
    }
  );
  return HiraRecord;
};
