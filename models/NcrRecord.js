"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NcrRecord extends Model {
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
        as: "owner",
        foreignKey: "owner_id",
      });
      this.belongsTo(models.Company, {
        as: "company",
        foreignKey: "company_id",
      });
      this.belongsTo(models.Department, {
        as: "department",
        foreignKey: "department_id",
      });
      this.belongsTo(models.NcrArea, {
        as: "area",
        foreignKey: "area_id",
      });
      this.belongsTo(models.NcrCategory, {
        as: "category",
        foreignKey: "category_id",
      });
      this.belongsTo(models.NcrSource, {
        as: "source",
        foreignKey: "source_id",
      });
      this.belongsTo(models.NcrNCType, {
        as: "ncType",
        foreignKey: "nc_type_id",
      });
      this.belongsTo(models.NcrManagementSystem, {
        as: "managementSystem",
        foreignKey: "management_system_id",
      });
      this.belongsTo(models.NcrStatus, {
        as: "status",
        foreignKey: "status_id",
      });
      this.belongsTo(models.FindingType, {
        as: "findingType",
        foreignKey: "finding_type_id",
      });
      this.hasMany(models.NcrDistributor, {
        as: "distributors",
        foreignKey: "ncr_record_id",
      });
      this.hasMany(models.NcrCorrectiveActionPlan, {
        as: "correctiveActionPlans",
        foreignKey: "ncr_record_id",
      });
      this.hasMany(models.NcrRecordDocument, {
        as: "documents",
        foreignKey: "ncr_record_id",
      });
      this.hasMany(models.NcrRecordHistory, {
        as: "history",
        foreignKey: "record_id",
      });
    }
  }
  NcrRecord.init(
    {
      user_id: DataTypes.INTEGER,
      owner_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
      department_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      area_id: DataTypes.INTEGER,
      supplier: DataTypes.STRING,
      source_id: DataTypes.INTEGER,
      ncr_number: DataTypes.STRING,
      ncr_date: DataTypes.DATE,
      description: DataTypes.TEXT,
      nc_type_id: DataTypes.INTEGER,
      root_cause: DataTypes.TEXT,
      correction_action: DataTypes.TEXT,
      management_system_id: DataTypes.INTEGER,
      verification_effectiveness: DataTypes.BOOLEAN,
      closing_remarks: DataTypes.TEXT,
      status_id: DataTypes.INTEGER,
      finding_type_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "NcrRecord",
      tableName: "qhses_ncr_records",
    }
  );
  return NcrRecord;
};
