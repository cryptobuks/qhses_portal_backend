"use strict";
require("dotenv").config();
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CalibrationRecord extends Model {
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
      this.belongsTo(models.User, {
        as: "owner",
        foreignKey: "owner_id",
      });
      this.belongsTo(models.CalibrationFrequency, {
        as: "calibrationFrequency",
        foreignKey: "calibration_frequency_id",
      });
      this.hasMany(models.CalibrationRecordHistory, {
        as: "history",
        foreignKey: "record_id",
      });
    }
  }
  CalibrationRecord.init(
    {
      user_id: DataTypes.INTEGER,
      owner_id: DataTypes.INTEGER,
      equipment_asset_number: DataTypes.STRING,
      instrument_description: DataTypes.STRING,
      referance_standard: DataTypes.STRING,
      manufacturer: DataTypes.STRING,
      instrument_serial_number: DataTypes.STRING,
      range: DataTypes.STRING,
      accuracy: DataTypes.STRING,
      calibration_frequency_id: DataTypes.INTEGER,
      calibration_date: DataTypes.DATE,
      calibration_due_date: DataTypes.DATE,
      certificate_number: DataTypes.STRING,
      certification_attachment: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("certification_attachment");
          return rawValue
            ? `${process.env.BASE_URL}/public/files/equipment_certifications/${rawValue}`
            : null;
        },
      },
      remarks: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CalibrationRecord",
      tableName: "qhses_calibration_records",
    }
  );
  return CalibrationRecord;
};
