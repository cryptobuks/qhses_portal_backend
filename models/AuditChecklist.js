"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuditChecklist extends Model {
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
      this.belongsTo(models.AuditFinding, {
        as: "finding",
        foreignKey: "audit_finding_id",
      });
    }
  }
  AuditChecklist.init(
    {
      user_id: DataTypes.INTEGER,
      audit_id: DataTypes.INTEGER,
      audit_finding_id: DataTypes.INTEGER,
      ncr_record_id: DataTypes.INTEGER,
      process: DataTypes.STRING,
      reference: DataTypes.STRING,
      requirements: DataTypes.STRING,
      observations: DataTypes.TEXT,
      submitted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "AuditChecklist",
      tableName: "qhses_audit_check_lists",
    }
  );
  return AuditChecklist;
};
