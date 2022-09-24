"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SurveyFeedbackAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.SurveyFeedback, {
        as: "feedback",
        foreignKey: "survey_feedback_id",
      });
      this.belongsTo(models.Question, {
        as: "question",
        foreignKey: "survey_question_id",
      });
    }
  }
  SurveyFeedbackAnswer.init(
    {
      survey_feedback_id: DataTypes.INTEGER,
      survey_question_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      remarks: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "SurveyFeedbackAnswer",
      tableName: "qhses_survey_feedback_answers",
    }
  );
  return SurveyFeedbackAnswer;
};
