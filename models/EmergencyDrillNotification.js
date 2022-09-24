"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmergencyDrillNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Audit, {
        as: "emergencyDrill",
        foreignKey: "emergency_drill_id",
      });
      this.hasMany(models.EmergencyDrillNotificationToEmail, {
        as: "toEmailUsers",
        foreignKey: "emergency_drill_notification_id",
      });
    }
  }
  EmergencyDrillNotification.init(
    {
      emergency_drill_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EmergencyDrillNotification",
      tableName: "qhses_emergency_drill_notifications",
    }
  );
  return EmergencyDrillNotification;
};
