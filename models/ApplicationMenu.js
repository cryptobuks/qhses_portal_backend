"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ApplicationMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Application, {
        as: "application",
        foreignKey: "application_id",
      });

      this.belongsToMany(models.Application, {
        as: "users",
        foreignKey: "application_id",
        through: "qhses_user_application_menus",
      });
    }
  }
  ApplicationMenu.init(
    {
      application_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      route: DataTypes.STRING,
      antd_icon_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ApplicationMenu",
      tableName: "qhses_application_menus",
    }
  );
  return ApplicationMenu;
};
