const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const models = require("../models");

const { Application, Company } = models;

module.exports = {
  checkAuth: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeaders = req.headers["authorization"];
    const bearerToken = authHeaders.split(" ");
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      models.User.findOne({
        where: { id: payload.aud },
        attributes: { exclude: ["password"] },
        include: [
          // { model: models.Role, as: "role" },
          {
            model: Application,
            as: "applications",
          },
          {
            model: Company,
            as: "companies",
          },
        ],
      })
        .then((user) => {
          if (!user) next(createError.Unauthorized());
          req.currentUser = user;
          next();
        })
        .catch((err) => {
          return next(createError.InternalServerError());
        });
    });
  },

  protectedRoute: (permissions) => {
    return (req, res, next) => {
      // if (!permissions.includes(req.currentUser.role.title))
      //   return next(createError.Forbidden());
      next();
    };
  },
};
