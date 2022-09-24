"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
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
      this.belongsTo(models.Aspect, {
        as: "aspect",
        foreignKey: "aspect_id",
      });
    }
  }
  Question.init(
    {
      survey_id: DataTypes.INTEGER,
      question_description: DataTypes.STRING,
      // question_aspect: DataTypes.STRING,
      aspect_id: DataTypes.INTEGER,
      rating_text_1: DataTypes.STRING,
      rating_text_2: DataTypes.STRING,
      rating_text_3: DataTypes.STRING,
      rating_text_4: DataTypes.STRING,
      rating_text_5: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "qhses_csr_questions",
    }
  );
  return Question;
};
