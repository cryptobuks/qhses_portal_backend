const { Op, where } = require("sequelize");
const models = require("../models");

const { asyncForEach } = require("../helpers/asyncForEach");

const {
  sequelize,
  Application,
  User,
  ApplicationMenu,
  UserApplication,
  UserApplicationMenu,

  ApplicationRole,
} = models;

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
  //   model: ApplicationMenu,
  //   as: "userApplicationMenus",
  // },
];

getAllApplications = async (req, res, next) => {
  try {
    const results = await Application.findAll({
      // where: { users_table_name: null },
      include: applicationInclude,
      order: [["id", "ASC"]],
    });
    res.send({
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

getUserApplications = async (req, res, next) => {
  try {
    const userId = req.currentUser.id;
    const empId = req.currentUser.emp_id;
    const userApplications = await UserApplication.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Application,
          as: "application",
          // include: applicationInclude,
        },
        // {
        //   model: ApplicationRole,
        //   as: "userRole",
        // },
      ],
      order: [["application_id", "ASC"]],
    });
    const otherApps = await Application.findAll({
      where: {
        users_table_name: {
          [Op.ne]: null,
        },
      },
      order: [["id", "ASC"]],
    });

    let applications = [];
    await asyncForEach(userApplications, async (userApplication) => {
      applications.push(userApplication.application);
    });

    console.log(applications);

    await asyncForEach(otherApps, async (otherApp) => {
      // const [results, metadata] = await sequelize.query(
      //   `SELECT * FROM ${otherApp.users_table_name} WHERE emp_code = ${empId}`
      // );
      // if (results && results.length && results[0]) {
      //   // const userData = results[0];
      //   applications.push(otherApp);
      // }
    });

    // applications = [...applications, ...otherApps];

    res.send({
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

getApplicationMenuById = async (req, res, next) => {
  const appId = req.params.id;
  try {
    let menuList = [];
    const application = await Application.findOne({
      where: { id: appId },
    });
    if (application) {
      const menu = await ApplicationMenu.findAll({
        where: { application_id: application.id },
        include: [
          {
            model: Application,
            as: "application",
            include: applicationInclude,
          },
        ],
        order: [["id", "ASC"]],
      });
      menuList = menu;
    }
    res.send({
      data: menuList,
    });
  } catch (error) {
    next(error);
  }
};
getApplicationMenuByRoute = async (req, res, next) => {
  const appRoute = req.params.route;
  try {
    let menuList = [];
    const application = await Application.findOne({
      where: { route: appRoute },
    });
    if (application) {
      const menu = await ApplicationMenu.findAll({
        where: { application_id: application.id },
        include: [
          {
            model: Application,
            as: "application",
            include: applicationInclude,
          },
        ],
        order: [["id", "ASC"]],
      });

      menuList = menu;
    }
    res.send({
      data: menuList,
    });
  } catch (error) {
    next(error);
  }
};

getApplicationByRoute = async (req, res, next) => {
  const appRoute = req.params.route;
  try {
    const application = await Application.findOne({
      include: applicationInclude,
      where: { route: appRoute },
    });

    res.send({
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

getUserApplicationMenuByRoute = async (req, res, next) => {
  const appRoute = req.params.route;
  try {
    let menuList = [];
    const application = await Application.findOne({
      where: { route: appRoute },
    });
    if (application) {
      const userId = req.currentUser.id;
      const menu = await UserApplicationMenu.findAll({
        where: { application_id: application.id, user_id: userId },
        include: [
          {
            model: ApplicationMenu,
            as: "applicationMenu",
          },
          {
            model: Application,
            as: "application",
          },
        ],
        order: [["application_menu_id", "ASC"]],
      });

      menuList = menu;
    }
    res.send({
      data: menuList,
    });
  } catch (error) {
    next(error);
  }
};

getUserApplicationRoleByRoute = async (req, res, next) => {
  const appRoute = req.params.route;
  try {
    let userApplicationRole = {};
    const application = await Application.findOne({
      where: { route: appRoute },
    });
    if (application) {
      const userId = req.currentUser.id;
      const userAppRole = await UserApplication.findOne({
        where: { application_id: application.id, user_id: userId },
        include: [
          {
            model: ApplicationRole,
            as: "userRole",
          },
        ],
      });

      if (userAppRole && userAppRole.userRole) {
        userApplicationRole = userAppRole.userRole;
      }
    }
    res.send({
      data: userApplicationRole,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllApplications,
  getUserApplications,
  getApplicationMenuById,
  getApplicationMenuByRoute,
  getApplicationByRoute,
  getUserApplicationMenuByRoute,
  getUserApplicationRoleByRoute,
};
