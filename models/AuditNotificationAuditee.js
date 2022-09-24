"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuditNotificationAuditee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "auditee_user_id",
      });
    }
  }
  AuditNotificationAuditee.init(
    {
      audit_id: DataTypes.INTEGER,
      audit_notification_id: DataTypes.INTEGER,
      auditee_user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AuditNotificationAuditee",
      tableName: "qhses_audit_notification_auditees",
    }
  );
  return AuditNotificationAuditee;
};
