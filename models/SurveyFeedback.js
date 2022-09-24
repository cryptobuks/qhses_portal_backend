"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SurveyFeedback extends Model {
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
      this.hasMany(models.SurveyFeedbackAnswer, {
        as: "answers",
        foreignKey: "survey_feedback_id",
      });
    }
  }
  SurveyFeedback.init(
    {
      survey_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      appreciation: DataTypes.TEXT,
      suggestions: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "SurveyFeedback",
      tableName: "qhses_survey_feedbacks",
    }
  );
  return SurveyFeedback;
};
