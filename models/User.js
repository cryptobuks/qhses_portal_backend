"use strict";
const bcrypt = require("bcryptjs");
const { application } = require("express");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, {
        as: "role",
        foreignKey: "role_id",
      });
      this.hasMany(models.UserCompany, {
        as: "userCompanies",
        foreignKey: "user_id",
      });
      this.hasMany(models.UserApplication, {
        as: "userApplications",
        foreignKey: "user_id",
      });
      this.hasMany(models.NcrRecord, {
        as: "records",
        foreignKey: "user_id",
      });
      this.hasMany(models.NcrRecord, {
        as: "owner_records",
        foreignKey: "owner_id",
      });
      this.belongsToMany(models.Application, {
        as: "applications",
        foreignKey: "user_id",
        otherKey: "application_id",
        through: models.UserApplication,
      });
      this.belongsToMany(models.Survey, {
        as: "surveys",
        foreignKey: "user_id",
        otherKey: "survey_id",
        through: models.SurveyUser,
      });
      this.belongsToMany(models.Company, {
        as: "companies",
        foreignKey: "user_id",
        otherKey: "company_id",
        through: models.UserCompany,
      });
    }
  }
  User.init(
    {
      role_id: DataTypes.INTEGER,
      emp_id: {
        type: DataTypes.STRING(100),
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      designation: DataTypes.STRING,
      department: DataTypes.STRING,
      password: DataTypes.STRING,
      company_code: DataTypes.STRING,
      company_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "qhses_users",
    }
  );

  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassord = await bcrypt.hash(user.password, salt);
    user.password = hashedPassord;
  });

  User.prototype.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
