"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LegalRegisterRecordReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Quater, {
        as: "quarter",
        foreignKey: "quarter_id",
      });
    }
  }
  LegalRegisterRecordReview.init(
    {
      register_record_id: DataTypes.INTEGER,
      quarter_id: DataTypes.INTEGER,
      review_done: DataTypes.BOOLEAN,
      remarks: DataTypes.TEXT,
      expiry_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "LegalRegisterRecordReview",
      tableName: "qhses_legal_register_Record_reviews",
    }
  );
  return LegalRegisterRecordReview;
};
