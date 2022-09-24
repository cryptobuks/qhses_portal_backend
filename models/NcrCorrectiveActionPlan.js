"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NcrCorrectiveActionPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.NcrRecord, {
        as: "ncrRecord",
        foreignKey: "ncr_record_id",
      });
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "responsible_user_id",
      });
      this.hasMany(models.NcrRecordDocument, {
        as: "documents",
        foreignKey: "ncr_corrective_action_plan_id",
      });
    }
  }
  NcrCorrectiveActionPlan.init(
    {
      ncr_record_id: DataTypes.INTEGER,
      responsible_user_id: DataTypes.INTEGER,
      target_date: DataTypes.DATE,
      days: DataTypes.STRING,
      description: DataTypes.TEXT,
      closing_date: DataTypes.DATE,
      closing_remarks: DataTypes.TEXT,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NcrCorrectiveActionPlan",
      tableName: "qhses_ncr_corrective_action_plans",
    }
  );
  return NcrCorrectiveActionPlan;
};
