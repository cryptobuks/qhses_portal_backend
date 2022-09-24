const { Op } = require("sequelize");
const models = require("../models");
const {
  addUserValidationSchema,
  updateUserValidationSchema,
  userValidationSchema,
  authValidationSchema,
} = require("../validations/user.validation");

const {
  User,
  VEmployeeList,
  Application,
  UserApplication,
  Company,
  UserCompany,
  UserApplicationMenu,
  ApplicationMenu,
  ApplicationRole,
} = models;
const createError = require("http-errors");
const { signAccessToken } = require("../helpers/jwt_helper");

const { asyncForEach } = require("../helpers/asyncForEach");

const applicationInclude = [
  {
    model: ApplicationMenu,
    as: "menus",
  },
  {
    model: ApplicationRole,
    as: "roles",
  },
  // {
  //   model: ApplicationRole,
  //   as: "userApplicationRole",
  // },
  // {
  //   model: ApplicationMenu,
  //   as: "userApplicationMenus",
  // },
];

const userInclude = [
  // { model: models.Role, as: "role" },
  {
    model: Application,
    as: "applications",
    include: applicationInclude,
  },
  {
    model: Company,
    as: "companies",
  },
];

addUser = async (req, res, next) => {
  try {
    await addUserValidationSchema.validateAsync(req.body);
    const employee = await VEmployeeList.findOne({
      where: { Emp_ID: req.body.emp_id },
    });
    if (!employee) throw createError.NotFound("Employee Not Found!");
    const userExists = await User.findOne({
      where: { emp_id: req.body.emp_id },
    });
    if (userExists)
      throw createError.Conflict("This employess has already been added.!");
    const user = {
      role_id: req.body.role_id,
      emp_id: req.body.emp_id,
      name: employee.emp_name,
      email: employee.EmailID ? employee.EmailID : req.body.emp_id + "@ncr.com",
      password: "qhses123@",
      designation: employee.designation,
      department: employee.department,
      company_code: employee.comp_name,
      company_name: employee.company_name,
    };
    const userCompanies = req.body.company_ids.map((companyId) => {
      return {
        company_id: companyId,
      };
    });
    const userApplications = req.body.applications.map((application) => {
      return {
        application_id: application.application_id,
        application_role_id: application.application_role_id,
      };
    });
    user["userCompanies"] = userCompanies;
    user["userApplications"] = userApplications;
    const savedUser = await User.create(user, {
      include: [
        {
          model: UserCompany,
          as: "userCompanies",
        },
        {
          model: UserApplication,
          as: "userApplications",
        },
      ],
    });
    let userApplicationMenus = [];
    req.body.applications.forEach((application) => {
      application.application_menu_ids.forEach((menuId) => {
        userApplicationMenus.push({
          user_id: savedUser.id,
          application_id: application.application_id,
          application_menu_id: menuId,
        });
      });
    });
    await UserApplicationMenu.bulkCreate(userApplicationMenus);
    const userData = await User.findOne({
      where: { id: savedUser.id },
      attributes: { exclude: ["password"] },
      include: [
        { model: models.Role, as: "role" },
        {
          model: Application,
          as: "applications",
        },
        {
          model: Company,
          as: "companies",
        },
      ],
    });
    res.send({
      message: "User created successfully.",
      data: userData,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

updateUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await updateUserValidationSchema.validateAsync(req.body);
    const userExists = await User.findOne({
      where: { id: userId },
    });
    if (!userExists) throw createError.Conflict("User does not exists!");

    /**
     * Delete Application
     */
    if (req.body.applicationsToDelete && req.body.applicationsToDelete.length) {
      await asyncForEach(req.body.applicationsToDelete, async (app) => {
        await UserApplication.destroy({
          where: { application_id: app.id, user_id: userId },
        });
        await UserApplicationMenu.destroy({
          where: { application_id: app.id, user_id: userId },
        });
      });
    }

    /**
     * Delete Application
     */

    /**
     * Delete Company
     */
    if (req.body.companysToDelete && req.body.companysToDelete.length) {
      await asyncForEach(req.body.companysToDelete, async (companyId) => {
        await UserCompany.destroy({
          where: { company_id: companyId, user_id: userId },
        });
      });
    }

    /**
     * Delete Company End
     */

    if (req.body.company_ids && req.body.company_ids.length) {
      const userCompanies = req.body.company_ids.map((companyId) => {
        return {
          user_id: userId,
          company_id: companyId,
        };
      });
      await UserCompany.bulkCreate(userCompanies);
    }

    if (req.body.applications && req.body.applications.length) {
      const userApplications = req.body.applications.map((application) => {
        return {
          user_id: userId,
          application_id: application.application_id,
          application_role_id: application.application_role_id,
        };
      });
      await UserApplication.bulkCreate(userApplications);
    }

    let userApplicationMenus = [];
    req.body.applications.forEach((application) => {
      application.application_menu_ids.forEach((menuId) => {
        userApplicationMenus.push({
          user_id: userId,
          application_id: application.application_id,
          application_menu_id: menuId,
        });
      });
    });
    await UserApplicationMenu.bulkCreate(userApplicationMenus);
    const newUser = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: UserApplication,
          as: "userApplications",
          include: [
            {
              model: Application,
              as: "application",
            },
            {
              model: ApplicationRole,
              as: "userRole",
            },
          ],
        },
        {
          model: Company,
          as: "companies",
        },
      ],
    });
    res.send({
      message: "User updated successfully.",
      data: newUser,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};
register = async (req, res, next) => {
  try {
    await userValidationSchema.validateAsync(req.body);
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (userExists)
      throw createError.Conflict("User with this email already exists!");
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      designation: req.body.designation,
      department: req.body.department,
    };
    const savedUser = await User.create(user);
    const accessToken = await signAccessToken(savedUser.id);
    res.send({
      message: "User created successfully.",
      token: accessToken,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

login = async (req, res, next) => {
  try {
    await authValidationSchema.validateAsync(req.body);
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) throw createError.NotFound("User not registered.");
    const userMatch = await user.isValidPassword(req.body.password);
    if (!userMatch) throw createError.Unauthorized("Invalid Email/Password");
    const accessToken = await signAccessToken(user.id);
    res.send({
      token: accessToken,
    });
  } catch (error) {
    if (error.isJoi == true)
      return next(createError.BadRequest("Invalid Email/Password"));
    next(error);
  }
};

index = async (req, res, next) => {
  try {
    const currentUserId = req.currentUser.id;
    const results = await User.findAll({
      where: {
        [Op.and]: [
          {
            id: {
              [Op.ne]: currentUserId,
            },
          },
          // {
          //   role_id: {
          //     [Op.ne]: 1,
          //   },
          // },
          // {
          //   role_id: {
          //     [Op.ne]: 2,
          //   },
          // },
        ],
      },

      // [Op.and]: [
      //   {
      //     role_id: {
      //       [Op.ne]: 1,
      //     },
      //     role_id: {
      //       [Op.ne]: 2,
      //     },
      //   },
      // ],
      attributes: { exclude: ["password"] },
      include: userInclude,
    });
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getAllUsers = async (req, res, next) => {
  try {
    const results = await User.findAll({
      attributes: { exclude: ["password"] },
      include: userInclude,
    });
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

profile = async (req, res, next) => {
  res.send({
    data: req.currentUser,
  });
  try {
  } catch (error) {
    next(error);
  }
};

getUserById = async (req, res, next) => {
  const userId = req.params.id;
  const result = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ["password"] },
    // include: userInclude,
    include: [
      {
        model: UserApplication,
        as: "userApplications",
        include: [
          {
            model: Application,
            as: "application",
            // include: [
            //   {
            //     model: ApplicationMenu,
            //     as: "userApplicationMenus",
            //   },
            // ],
          },
          {
            model: ApplicationRole,
            as: "userRole",
          },
          // {
          //   model: ApplicationMenu,
          //   as: "userApplicationMenus",
          // },
        ],
      },
      {
        model: Company,
        as: "companies",
      },
    ],
  });

  // let newApps = [];
  // await asyncForEach(result.applications, async (application) => {
  //   const applicationRoleId = application.UserApplication.application_role_id;
  //   ApplicationRole.findOne({});

  //   const userApplicationRole = await ApplicationRole.findOne({
  //     where: { id: applicationRoleId },
  //   });
  //   application["userApplicationRole"] = userApplicationRole;
  //   newApps.push(application);
  // });
  // result["applications"] = newApps;

  res.send({
    data: result,
  });
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUser,
  updateUser,
  register,
  login,
  index,
  getAllUsers,
  profile,
  getUserById,
};
