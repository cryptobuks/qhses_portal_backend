"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuditNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Audit, {
        as: "audit",
        foreignKey: "audit_id",
      });
      this.hasMany(models.AuditNotificationAuditor, {
        as: "auditors",
        foreignKey: "audit_notification_id",
      });
      this.hasMany(models.AuditNotificationAuditee, {
        as: "auditees",
        foreignKey: "audit_notification_id",
      });
      this.hasMany(models.AuditNotificationToEmail, {
        as: "toEmailUsers",
        foreignKey: "audit_notification_id",
      });
      this.hasMany(models.AuditNotificationReferenceDocument, {
        as: "referenceDocuments",
        foreignKey: "audit_notification_id",
      });
    }
  }
  AuditNotification.init(
    {
      audit_id: DataTypes.INTEGER,
      audit_from_date: DataTypes.DATE,
      audit_to_date: DataTypes.DATE,
      scope_of_audit: DataTypes.TEXT,
      reference_documents: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AuditNotification",
      tableName: "qhses_audit_notifications",
    }
  );
  return AuditNotification;
};
