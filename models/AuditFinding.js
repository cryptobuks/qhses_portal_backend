"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuditFinding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.FindingType, {
        as: "type",
        foreignKey: "type_id",
      });
    }
  }
  AuditFinding.init(
    {
      type_id: DataTypes.INTEGER,
      create_ncr: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      color_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AuditFinding",
      tableName: "qhses_audit_findings",
    }
  );
  return AuditFinding;
};
