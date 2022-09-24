"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VEmployeeAttendence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VEmployeeAttendence.init(
    {
      emp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      emp_name: DataTypes.STRING,
      Swipedate: DataTypes.DATE,
      LocationCode: DataTypes.STRING,
      LocationDesc: DataTypes.STRING,
      comp_code: DataTypes.STRING,
      company_name: DataTypes.STRING,
      DepartmentCode: DataTypes.STRING,
      DepartmentDesc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "VEmployeeAttendence",
      tableName: "v_hses_attendanceData",
      timestamps: false,
    }
  );
  return VEmployeeAttendence;
};
