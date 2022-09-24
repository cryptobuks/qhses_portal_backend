"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuditNotificationToEmail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "to_email_user_id",
      });
    }
  }
  AuditNotificationToEmail.init(
    {
      audit_id: DataTypes.INTEGER,
      audit_notification_id: DataTypes.INTEGER,
      to_email_user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AuditNotificationToEmail",
      tableName: "qhses_audit_notification_to_emails",
    }
  );
  return AuditNotificationToEmail;
};
