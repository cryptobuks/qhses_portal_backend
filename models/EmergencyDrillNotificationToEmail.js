"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmergencyDrillNotificationToEmail extends Model {
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
  EmergencyDrillNotificationToEmail.init(
    {
      emergency_drill_id: DataTypes.INTEGER,
      emergency_drill_notification_id: DataTypes.INTEGER,
      to_email_user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EmergencyDrillNotificationToEmail",
      tableName: "qhses_emergency_drill_notification_to_emails",
    }
  );
  return EmergencyDrillNotificationToEmail;
};
