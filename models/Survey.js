"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class surveys extends Model {
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
      this.belongsTo(models.Year, {
        as: "year",
        foreignKey: "year_id",
      });
      this.belongsTo(models.Quater, {
        as: "quater",
        foreignKey: "quater_id",
      });
      this.belongsTo(models.Company, {
        as: "company",
        foreignKey: "company_id",
      });
      this.hasMany(models.Question, {
        as: "questions",
        foreignKey: "survey_id",
      });
      this.belongsToMany(models.User, {
        as: "users",
        foreignKey: "survey_id",
        otherKey: "user_id",
        through: models.SurveyUser,
      });
      this.hasMany(models.SurveyFeedback, {
        as: "feedbacks",
        foreignKey: "survey_id",
      });
    }
  }
  surveys.init(
    {
      user_id: DataTypes.INTEGER,
      year_id: DataTypes.INTEGER,
      quater_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Survey",
      tableName: "qhses_csr_surveys",
    }
  );
  return surveys;
};
