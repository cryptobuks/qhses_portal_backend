"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserApplicationMenu extends Model {
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
      this.belongsTo(models.Application, {
        as: "application",
        foreignKey: "application_id",
      });
      this.belongsTo(models.ApplicationMenu, {
        as: "applicationMenu",
        foreignKey: "application_menu_id",
      });
    }
  }
  UserApplicationMenu.init(
    {
      user_id: DataTypes.INTEGER,
      application_id: DataTypes.INTEGER,
      application_menu_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserApplicationMenu",
      tableName: "qhses_user_application_menus",
    }
  );
  return UserApplicationMenu;
};
