"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ApplicationMenu, {
        as: "menus",
        foreignKey: "application_id",
      });
      this.hasMany(models.ApplicationRole, {
        as: "roles",
        foreignKey: "application_id",
      });
      this.belongsToMany(models.ApplicationRole, {
        as: "userApplicationRole",
        foreignKey: "application_id",
        otherKey: "user_id",
        through: models.UserApplication,
      });
      this.belongsToMany(models.ApplicationMenu, {
        as: "userApplicationMenus",
        foreignKey: "application_id",
        otherKey: "user_id",
        through: models.UserApplicationMenu,
      });
    }
  }
  Application.init(
    {
      title: DataTypes.STRING,
      route: DataTypes.STRING,
      antd_icon_name: DataTypes.STRING,
      users_table_name: DataTypes.STRING,
      app_auth_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Application",
      tableName: "qhses_applications",
    }
  );
  return Application;
};
