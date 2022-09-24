"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id",
      });
      this.belongsTo(models.Application, {
        as: "application",
        foreignKey: "application_id",
      });
      this.belongsTo(models.ApplicationRole, {
        as: "userRole",
        foreignKey: "application_role_id",
      });
      // this.belongsToMany(models.ApplicationMenu, {
      //   as: "userApplicationMenus",
      //   foreignKey: "application_id",
      //   otherKey: "user_id",
      //   through: models.UserApplicationMenu,
      // });
    }
  }
  UserApplication.init(
    {
      user_id: DataTypes.INTEGER,
      application_id: DataTypes.INTEGER,
      application_role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserApplication",
      tableName: "qhses_user_applications",
    }
  );
  return UserApplication;
};
