"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Audit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Year, {
        as: "year",
        foreignKey: "year_id",
      });
      this.belongsTo(models.Month, {
        as: "month",
        foreignKey: "month_id",
      });
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id",
      });
      this.belongsTo(models.Company, {
        as: "company",
        foreignKey: "company_id",
      });
      this.belongsTo(models.Department, {
        as: "department",
        foreignKey: "department_id",
      });
      this.hasOne(models.AuditNotification, {
        as: "notification",
        foreignKey: "audit_id",
      });
      this.hasMany(models.AuditNotificationAuditor, {
        as: "auditors",
        foreignKey: "audit_id",
      });
      this.hasMany(models.AuditNotificationAuditee, {
        as: "auditees",
        foreignKey: "audit_id",
      });
      this.hasMany(models.AuditNotificationToEmail, {
        as: "toEmailUsers",
        foreignKey: "audit_id",
      });
      this.hasMany(models.AuditNotificationReferenceDocument, {
        as: "referenceDocuments",
        foreignKey: "audit_id",
      });
      this.belongsTo(models.AuditStatus, {
        as: "status",
        foreignKey: "audit_status_id",
      });
      this.hasMany(models.AuditChecklist, {
        as: "checklist",
        foreignKey: "audit_id",
      });
    }
  }
  Audit.init(
    {
      user_id: DataTypes.INTEGER,
      year_id: DataTypes.INTEGER,
      month_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
      department_id: DataTypes.INTEGER,
      audit_number: DataTypes.STRING(100),
      title: DataTypes.STRING,
      audit_for: DataTypes.STRING,
      audit_status_id: DataTypes.INTEGER,
      reminder_sent: DataTypes.BOOLEAN,
      previous_audit_follow_up: DataTypes.TEXT,
      audit_evidence: DataTypes.TEXT,
      other_facts_incidents: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Audit",
      tableName: "qhses_audits",
    }
  );
  return Audit;
};
