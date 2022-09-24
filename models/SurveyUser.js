"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SurveyUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Survey, {
        as: "survey",
        foreignKey: "survey_id",
      });
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id",
      });
      this.belongsTo(models.Company, {
        as: "company",
        foreignKey: "company_id",
      });
    }
  }
  SurveyUser.init(
    {
      survey_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SurveyUser",
      tableName: "qhses_csr_survey_users",
    }
  );
  return SurveyUser;
};
