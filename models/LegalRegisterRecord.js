"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LegalRegisterRecord extends Model {
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
      this.belongsTo(models.User, {
        as: "lastUpdateBy",
        foreignKey: "last_update_by_user_id",
      });
      this.belongsTo(models.Year, {
        as: "year",
        foreignKey: "year_id",
      });
      this.hasMany(models.LegalRegisterRecordReview, {
        as: "reviews",
        foreignKey: "register_record_id",
      });
    }
  }
  LegalRegisterRecord.init(
    {
      user_id: DataTypes.INTEGER,
      last_update_by_user_id: DataTypes.INTEGER,
      year_id: DataTypes.INTEGER,
      legal_other_references: DataTypes.STRING,
      activity: DataTypes.TEXT,
      legal_other_requirements: DataTypes.STRING,
      reference_documents: DataTypes.STRING,
      responsible: DataTypes.STRING,
      remarks: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "LegalRegisterRecord",
      tableName: "qhses_legal_register_records",
    }
  );
  return LegalRegisterRecord;
};
