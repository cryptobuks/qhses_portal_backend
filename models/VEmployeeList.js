"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VEmployeeList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VEmployeeList.init(
    {
      Emp_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      emp_name: DataTypes.STRING,
      comp_code: DataTypes.STRING,
      dept_code: DataTypes.STRING,
      cat_code: DataTypes.STRING,
      desig_code: DataTypes.STRING,
      country_code: DataTypes.STRING,
      company_name: DataTypes.STRING,
      BU_short_desc: DataTypes.STRING,
      Business_Unit: DataTypes.STRING,
      department: DataTypes.STRING,
      category: DataTypes.STRING,
      designation: DataTypes.STRING,
      country: DataTypes.STRING,
      doj: DataTypes.STRING,
      Gender: DataTypes.STRING,
      EmailID: DataTypes.STRING,
      Status: DataTypes.STRING,
      reporting_to_id: DataTypes.STRING,
      Staff_Type: DataTypes.STRING,
      facility: DataTypes.STRING,
      facility_code: DataTypes.STRING,
      dot: DataTypes.STRING,
      AD_User: DataTypes.STRING,
      reporting_to_name: DataTypes.STRING,
      reporting_to_desig: DataTypes.STRING,
      hod_name: DataTypes.STRING,
      hod_desig: DataTypes.STRING,
      hod_id: DataTypes.STRING,
      Card_ID: DataTypes.STRING,
      Domain_Name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "VEmployeeList",
      tableName: "v_employee_list",
      timestamps: false,
    }
  );
  return VEmployeeList;
};
