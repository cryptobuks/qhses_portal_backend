const Joi = require("joi").defaults((schema) =>
  schema.options({
    allowUnknown: true,
  })
);

const questionsSchema = {
  question_description: Joi.string().required(),
  aspect_id: Joi.required(),
  rating_text_1: Joi.string().required(),
  rating_text_2: Joi.string().required(),
  rating_text_3: Joi.string().required(),
  rating_text_4: Joi.string().required(),
  rating_text_5: Joi.string().required(),
};
const usersSchema = {
  user_id: Joi.required(),
};

const feedbackAnswerSchema = {
  question_id: Joi.required(),
  rating: Joi.required(),
  remarks: Joi.optional(),
};

const surveyValidationSchema = Joi.object()
  .keys({
    title: Joi.required(),
    description: Joi.required(),
    year_id: Joi.required(),
    quater_id: Joi.required(),
    company_id: Joi.required(),
    questions: Joi.array()
      .min(1)
      .items(Joi.object(questionsSchema).options({ allowUnknown: true }))
      .required(),
    users: Joi.array()
      .min(1)
      .items(Joi.object(usersSchema).options({ allowUnknown: true }))
      .required(),
  })
  .options({ allowUnknown: true });

const updateSurveyValidationSchema = Joi.object()
  .keys({
    questions: Joi.array()
      .items(Joi.object(questionsSchema).options({ allowUnknown: true }))
      .optional(),
    users: Joi.array()
      .items(Joi.object(usersSchema).options({ allowUnknown: true }))
      .optional(),
  })
  .options({ allowUnknown: true });

const addSurveyFeedbackValidationSchema = Joi.object()
  .keys({
    appreciation: Joi.optional(),
    suggestions: Joi.optional(),
    answers: Joi.array()
      .items(Joi.object(feedbackAnswerSchema).options({ allowUnknown: true }))
      .optional(),
  })
  .options({ allowUnknown: true });

module.exports = {
  surveyValidationSchema,
  updateSurveyValidationSchema,
  addSurveyFeedbackValidationSchema,
};
