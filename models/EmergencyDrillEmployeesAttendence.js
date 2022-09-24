"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmergencyDrillEmployeesAttendence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmergencyDrillEmployeesAttendence.init(
    {
      emergency_drill_id: DataTypes.INTEGER,
      employee_type: DataTypes.STRING,
      employee_id: DataTypes.STRING,
      employee_name: DataTypes.STRING,
      company_name: DataTypes.STRING,
      company_code: DataTypes.STRING,
      department_name: DataTypes.STRING,
      department_code: DataTypes.STRING,
      location_name: DataTypes.STRING,
      location_code: DataTypes.STRING,
      present: DataTypes.BOOLEAN,
      out_of_office: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "EmergencyDrillEmployeesAttendence",
      tableName: "qhses_emergency_drill_employees_attendences",
    }
  );
  return EmergencyDrillEmployeesAttendence;
};
