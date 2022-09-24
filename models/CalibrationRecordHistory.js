"use strict";
require("dotenv").config();
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CalibrationRecordHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.CalibrationRecord, {
        as: "histroy",
        foreignKey: "record_id",
      });
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id",
      });
    }
  }
  CalibrationRecordHistory.init(
    {
      record_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      calibration_date: DataTypes.STRING,
      calibration_due_date: DataTypes.STRING,
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
      modelName: "CalibrationRecordHistory",
      tableName: "qhses_calibration_record_history",
    }
  );
  return CalibrationRecordHistory;
};
