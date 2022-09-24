// require("dotenv").config();
// const axios = require("axios");
// const { Op } = require("sequelize");
// const models = require("../models");
// const { authValidationSchema } = require("../validations/auth.validation");

// const createError = require("http-errors");
// const { signAccessToken } = require("../helpers/jwt_helper");

// authenticate = async (req, res, next) => {
//   try {
//     await authValidationSchema.validateAsync(req.body);
//     var options = {
//       method: "POST",
//       url: process.env.SERVER_AUTH_URL,
//       data: {
//         tokenid: req.body.token,
//       },
//     };
//     const result = await axios(options);
//     if (!result.data) throw createError.NotFound("User not authorized.");
//     if (result.data[0].u_status == "error")
//       throw createError.NotFound("User not authorized.");

//     const empId = result.data[0].userempid;
//     const redirectUrl = result.data[0].redirecturl;
//     const accessToken = await signAccessToken(empId);
//     res.send({
//       token: accessToken,
//       redirectUrl: redirectUrl,
//     });
//   } catch (error) {
//     if (error.isJoi == true) error.status = 422;
//     next(error);
//   }
// };

// module.exports = {
//   authenticate,
// };

require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const models = require("../models");
const { authValidationSchema } = require("../validations/auth.validation");

const { User, VEmployeeList } = models;
const createError = require("http-errors");
const { signAccessToken } = require("../helpers/jwt_helper");

authenticate = async (req, res, next) => {
  try {
    await authValidationSchema.validateAsync(req.body);
    var options = {
      method: "POST",
      url: process.env.SERVER_AUTH_URL,
      data: {
        tokenid: req.body.token,
      },
    };
    // console.log(result);
    const result = await axios(options);

    // const result = {
    //   data: [
    //     {
    //       slno: 241,
    //       tokenid: "9e0b621f-17fa-47d0-9342-780341eb69bd",
    //       userid: "",
    //       userempid: "10678",
    //       username: "Sathish Kumar",
    //       redirecturl: "/",
    //       isexpired: false,
    //       create_time: "2021-11-07T14:21:20.777",
    //       u_status: "success",
    //       u_errmsg: "",
    //     },
    //   ],
    // };

    if (!result.data) throw createError.Unauthorized("User not authorized.");
    if (result.data[0].u_status == "error")
      throw createError.Unauthorized("User not authorized.");

    const empId = result.data[0].userempid;
    const redirectUrl = result.data[0].redirecturl;
    const user = await User.findOne({
      where: { emp_id: empId },
    });
    if (!user) throw createError.Unauthorized("User not authorized.");
    const accessToken = await signAccessToken(user.id);
    res.send({
      token: accessToken,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

module.exports = {
  authenticate,
};
