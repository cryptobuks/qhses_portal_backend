"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuditNotificationAuditor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "auditor_user_id",
      });
    }
  }
  AuditNotificationAuditor.init(
    {
      audit_id: DataTypes.INTEGER,
      audit_notification_id: DataTypes.INTEGER,
      auditor_user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AuditNotificationAuditor",
      tableName: "qhses_audit_notification_auditors",
    }
  );
  return AuditNotificationAuditor;
};
