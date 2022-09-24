"use strict";
require("dotenv").config();
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuditNotificationReferenceDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuditNotificationReferenceDocument.init(
    {
      audit_id: DataTypes.INTEGER,
      audit_notification_id: DataTypes.INTEGER,
      document_name: DataTypes.STRING,
      document_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${process.env.BASE_URL}/public/files/audit_documents/${this.document_name}`;
        },
        set(value) {
          throw new Error("Do not try to set the `documentUrl` value!");
        },
      },
    },
    {
      sequelize,
      modelName: "AuditNotificationReferenceDocument",
      tableName: "qhses_audit_notification_reference_documents",
    }
  );
  return AuditNotificationReferenceDocument;
};
