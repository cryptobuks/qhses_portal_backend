"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        as: "users",
        foreignKey: "company_id",
        otherKey: "user_id",
        through: models.UserCompany,
      });
    }
  }
  Company.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "qhses_companies",
    }
  );
  return Company;
};
