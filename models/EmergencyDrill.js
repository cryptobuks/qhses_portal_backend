"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmergencyDrill extends Model {
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
      this.belongsTo(models.EmergencyDrillType, {
        as: "type",
        foreignKey: "type_id",
      });
      this.belongsToMany(models.Location, {
        as: "locations",
        foreignKey: "emergency_drill_id",
        otherKey: "location_id",
        through: models.EmergencyDrillLocation,
      });
      this.belongsTo(models.EmergencyDrillStatus, {
        as: "status",
        foreignKey: "status_id",
      });
      this.hasOne(models.EmergencyDrillNotification, {
        as: "notification",
        foreignKey: "emergency_drill_id",
      });
      this.hasMany(models.EmergencyDrillNotificationToEmail, {
        as: "toEmailsUsers",
        foreignKey: "emergency_drill_id",
      });
      this.hasMany(models.EmergencyDrillHighlight, {
        as: "highlights",
        foreignKey: "emergency_drill_id",
      });
      this.hasMany(models.EmergencyDrillEmployeesAttendence, {
        as: "attendenceEmployees",
        foreignKey: "emergency_drill_id",
      });
      this.hasMany(models.EmergencyDrillAttachment, {
        as: "attachments",
        foreignKey: "emergency_drill_id",
      });
    }
  }
  EmergencyDrill.init(
    {
      user_id: DataTypes.INTEGER,
      year_id: DataTypes.INTEGER,
      month_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
      drill_number: DataTypes.STRING,
      shift_date_time: DataTypes.DATE,
      purpose: DataTypes.TEXT,
      drill_coordinator: DataTypes.STRING,
      response_team_leader: DataTypes.STRING,
      response_team_members: DataTypes.STRING,
      traffic_controllers: DataTypes.STRING,
      drill_scenarios: DataTypes.TEXT,
      staff_response_time: DataTypes.STRING,
      used_emergency_equipments: DataTypes.STRING,
      positive_notes: DataTypes.TEXT,
      observation_points: DataTypes.TEXT,
      general_observations: DataTypes.TEXT,
      corrective_action_points: DataTypes.TEXT,
      attendence_submitted: DataTypes.BOOLEAN,
      submitted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "EmergencyDrill",
      tableName: "qhses_emergency_drills",
    }
  );
  return EmergencyDrill;
};
