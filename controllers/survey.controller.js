require("dotenv").config();
const Joi = require("joi");
const { Op } = require("sequelize");
const createError = require("http-errors");
const moment = require("moment");
const models = require("../models");
const {
  surveyValidationSchema,
  updateSurveyValidationSchema,
  addSurveyFeedbackValidationSchema,
} = require("../validations/survey.validation");
const { asyncForEach } = require("../helpers/asyncForEach");
const {
  assignSurveyToUserTemplate,
  receiveFeedbackOnSurveyTemplate,
} = require("../helpers/email_template");

const {
  sequelize,
  Application,
  User,
  ApplicationMenu,
  UserApplication,
  Survey,
  Question,
  SurveyUser,
  Year,
  Quater,
  Company,
  SurveyFeedback,
  SurveyFeedbackAnswer,
  UserCompany,
  Aspect,
} = models;

const surveyInclude = [
  { model: User, as: "user", attributes: { exclude: ["password"] } },
  { model: Year, as: "year" },
  { model: Quater, as: "quater" },
  { model: Company, as: "company" },
  {
    model: Question,
    as: "questions",
    include: [{ model: Aspect, as: "aspect" }],
  },
  {
    model: User,
    as: "users",
    attributes: { exclude: ["password"] },
    // include: [{ model: Company, as: "company" }],
  },
  {
    model: SurveyFeedback,
    as: "feedbacks",
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
      {
        model: SurveyFeedbackAnswer,
        as: "answers",
        include: {
          model: Question,
          as: "question",
        },
      },
    ],
  },
];

index = async (req, res, next) => {
  let limit = 10;
  let offset = 0 + (req.query.page - 1) * limit;
  const yearId = req.query.year_id;
  const quaterId = req.query.quater_id;
  const companyId = req.query.company_id;

  try {
    var whereClause = {};
    if (yearId) {
      whereClause["year_id"] = {
        [Op.eq]: yearId,
      };
    }
    if (quaterId) {
      whereClause["quater_id"] = {
        [Op.eq]: quaterId,
      };
    }
    if (companyId) {
      whereClause["company_id"] = {
        [Op.eq]: companyId,
      };
    }
    const results = await Survey.findAll({
      where: whereClause,
      include: surveyInclude,
    });
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

surveyDetail = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await Survey.findOne({
      where: { id: id },
      include: surveyInclude,
    });
    if (!data) throw createError.NotFound();
    res.send({
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

addSurvey = async (req, res, next) => {
  try {
    await surveyValidationSchema.validateAsync(req.body);
    req.body.user_id = req.currentUser.id;
    const createdSurvey = await Survey.create(req.body, {
      include: [
        {
          model: Question,
          as: "questions",
        },
      ],
    });
    let surveyUsers = [];
    req.body.users.forEach((user) => {
      surveyUsers.push({
        survey_id: createdSurvey.id,
        user_id: user.user_id,
        company_id: user.company_id,
      });
    });
    await SurveyUser.bulkCreate(surveyUsers);
    if (req.body.users && req.body.users.length) {
      await asyncForEach(req.body.users, async (user) => {
        const msgSubject = "Customer Satisfication Survey";
        const msgbody = assignSurveyToUserTemplate(
          user.user_name,
          `${process.env.FRONTEND_BASE_URL}/customer-survey/surveys/${createdSurvey.id}/feedback`
        );
        await sequelize.query(
          `InsertEmailAlerts  @msg_to = '${user.user_email}', @msg_cc = '', @msg_subject = '${msgSubject}', @msg_body = '${msgbody}', @is_send = 0, @emailtype = customerSurvey;`
        );
      });
    }

    const surveyRes = await Survey.findOne({
      where: { id: createdSurvey.id },
      include: surveyInclude,
    });
    res.send({
      data: surveyRes,
    });
  } catch (error) {
    next(error);
  }
};

updateSurvey = async (req, res, next) => {
  try {
    await updateSurveyValidationSchema.validateAsync(req.body);
    const id = req.params.id;
    req.body.user_id = req.currentUser.id;
    if (req.body.questions && req.body.questions.length) {
      await Question.bulkCreate(req.body.questions);
    }

    let surveyUsers = [];
    if (req.body.users && req.body.users.length) {
      req.body.users.forEach((user) => {
        surveyUsers.push({
          survey_id: id,
          user_id: user.user_id,
          company_id: user.company_id,
        });
      });
      await SurveyUser.bulkCreate(surveyUsers);
      if (req.body.users && req.body.users.length) {
        await asyncForEach(req.body.users, async (user) => {
          const msgSubject = "Customer Satisfication Survey";
          const msgbody = assignSurveyToUserTemplate(
            user.user_name,
            `${process.env.FRONTEND_BASE_URL}/customer-survey/surveys/${id}/feedback`
          );
          await sequelize.query(
            `InsertEmailAlerts  @msg_to = '${user.user_email}', @msg_cc = '', @msg_subject = '${msgSubject}', @msg_body = '${msgbody}', @is_send = 0, @emailtype = customerSurvey;`
          );
        });
      }
    }

    const surveyRes = await Survey.findOne({
      where: { id: id },
      include: surveyInclude,
    });
    res.send({
      data: surveyRes,
    });
  } catch (error) {
    next(error);
  }
};

addSurveyFeedback = async (req, res, next) => {
  try {
    const surveyId = req.params.id;
    const userId = req.currentUser.id;
    await updateSurveyValidationSchema.validateAsync(req.body);
    req.body.survey_id = surveyId;
    req.body.user_id = userId;
    const user = await User.findOne({
      where: { id: userId },
    });
    console.log(user);
    if (!user) throw createError.NotFound("User does not exists!");
    const surveyExists = await Survey.findOne({
      where: { id: surveyId },
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
      ],
    });
    if (!surveyExists) throw createError.NotFound("Survey does not exists!");

    const msgSubject = "Received New Feedback on Survey";
    const msgbody = receiveFeedbackOnSurveyTemplate(
      surveyExists.user.name,
      user.name,
      `${process.env.FRONTEND_BASE_URL}/customer-survey/surveys/detail/${surveyExists.id}?feedbackUserId=${user.id}`
    );
    await sequelize.query(
      `InsertEmailAlerts  @msg_to = '${surveyExists.user.email}', @msg_cc = '', @msg_subject = '${msgSubject}', @msg_body = '${msgbody}', @is_send = 0, @emailtype = customerSurvey;`
    );

    await SurveyFeedback.create(req.body, {
      include: [
        {
          model: SurveyFeedbackAnswer,
          as: "answers",
        },
      ],
    });

    const surveyRes = await Survey.findOne({
      where: { id: surveyId },
      include: surveyInclude,
    });
    res.send({
      data: surveyRes,
    });
  } catch (error) {
    next(error);
  }
};

sendSurveyReminderToUser = async (req, res, next) => {
  try {
    const surveyId = req.params.surveyId;
    const surveyUserId = req.params.surveyUserId;

    const user = await User.findOne({
      where: { id: surveyUserId },
    });

    const msgSubject = "Customer Satisfication Survey";
    const msgbody = assignSurveyToUserTemplate(
      user.name,
      `${process.env.FRONTEND_BASE_URL}/customer-survey/surveys/${surveyId.id}/feedback`
    );
    await sequelize.query(
      `InsertEmailAlerts  @msg_to = '${user.email}', @msg_cc = '', @msg_subject = '${msgSubject}', @msg_body = '${msgbody}', @is_send = 0, @emailtype = customerSurvey;`
    );

    res.send({
      data: "Reminder Send Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

getRatingsByUserCompanyAndYear = async (req, res, next) => {
  try {
    const yearIds = req.body.yearIds;
    const questionTotalRating = 10;

    let data = [];
    let formatedData = [];

    await asyncForEach(yearIds, async (yearId) => {
      const year = await Year.findOne({ where: { id: yearId } });

      const [results, metadata1] = await sequelize.query(
        `SELECT c.id as companyId, c.name as companyName, ROUND(AVG(CAST(fa.rating AS FLOAT)), 2) AS averageRating FROM qhses_csr_surveys as s
        RIGHT JOIN qhses_csr_questions as q ON s.id = q.survey_id
        RIGHT JOIN qhses_survey_feedbacks as sf ON s.id = sf.survey_id
        RIGHT JOIN qhses_survey_feedback_answers as fa ON q.id = fa.survey_question_id AND s.year_id = ${yearId}
        RIGHT JOIN qhses_csr_survey_users as su ON s.id = su.survey_id AND su.user_id = sf.user_id
        RIGHT JOIN qhses_companies as c ON su.company_id = c.id
        GROUP BY c.id, c.name`
      );

      const newRes = results.map((item) => {
        return {
          ...item,
          averageRating: item.averageRating * questionTotalRating,
        };
      });
      data.push({
        year: year,
        results: newRes,
      });
    });

    res.send({
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

getRatingByQuestionAspectAndYear = async (req, res, next) => {
  try {
    const yearIds = req.body.yearIds;
    const questionTotalRating = 10;

    let data = [];

    await asyncForEach(yearIds, async (yearId) => {
      const year = await Year.findOne({ where: { id: yearId } });

      const [results, metadata1] = await sequelize.query(
        `SELECT a.id as aspectId, a.title as aspect, ROUND(AVG(CAST(fa.rating AS FLOAT)), 2) AS averageRating FROM qhses_csr_surveys as s
        RIGHT JOIN qhses_csr_questions as q ON s.id = q.survey_id
        RIGHT JOIN qhses_survey_feedback_answers as fa ON q.id = fa.survey_question_id AND s.year_id = ${yearId}
        RIGHT JOIN qhses_aspects as a ON q.aspect_id = a.id
        GROUP BY a.id, a.title`
      );

      data.push({
        year: year,
        results: results,
      });
    });

    res.send({
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

getRatingsByUserCompanyYearAndAspect = async (req, res, next) => {
  try {
    const yearId = req.body.yearIds;
    const aspectId = req.body.aspectId;
    const questionTotalRating = 10;

    const year = await Year.findOne({ where: { id: yearId } });
    const [results, metadata1] = await sequelize.query(
      `SELECT c.id as companyId, c.name as companyName, ROUND(AVG(CAST(fa.rating AS FLOAT)), 2) AS averageRating FROM qhses_csr_surveys as s
      RIGHT JOIN qhses_csr_questions as q ON s.id = q.survey_id AND q.aspect_id = ${aspectId}
      RIGHT JOIN qhses_survey_feedbacks as sf ON s.id = sf.survey_id
      RIGHT JOIN qhses_survey_feedback_answers as fa ON q.id = fa.survey_question_id AND s.year_id = ${yearId}
      RIGHT JOIN qhses_csr_survey_users as su ON s.id = su.survey_id AND su.user_id = sf.user_id
      RIGHT JOIN qhses_companies as c ON su.company_id = c.id
      GROUP BY c.id, c.name`
    );

    const newRes = results.map((item) => {
      return {
        ...item,
        averageRating: item.averageRating * questionTotalRating,
      };
    });

    res.send({
      data: newRes,
    });
  } catch (error) {
    next(error);
  }
};

getAllSurveysData = async (req, res, next) => {
  try {
    const surveys = await Survey.findAll();
    const questions = await Question.findAll();
    const surveyUsers = await SurveyUser.findAll();
    const surveyFeedbacks = await SurveyFeedback.findAll();
    const surveyFeedbackAnswers = await SurveyFeedbackAnswer.findAll();

    const data = {
      surveys,
      questions,
      surveyUsers,
      surveyFeedbacks,
      surveyFeedbackAnswers,
    };

    res.send({
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  surveyDetail,
  addSurvey,
  updateSurvey,
  addSurveyFeedback,
  sendSurveyReminderToUser,
  getRatingsByUserCompanyAndYear,
  getRatingByQuestionAspectAndYear,
  getRatingsByUserCompanyYearAndAspect,

  getAllSurveysData,
};
