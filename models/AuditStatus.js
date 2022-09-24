"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuditStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuditStatus.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      color_code: DataTypes.STRING,
      antd_icon_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AuditStatus",
      tableName: "qhses_audit_statuses",
    }
  );
  return AuditStatus;
};
