const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const applicationRoutes = require("./routes/application.routes");
const commonRoutes = require("./routes/common.routes");
const ncrRecordRoutes = require("./routes/ncrRecords.routes");
const caliobrationRecordRoutes = require("./routes/calibrationRecords.routes");
const surveyRoutes = require("./routes/survey.routes");
const auditRoutes = require("./routes/audit.routes");
const emergencyDrillRoutes = require("./routes/emergencyDrill.routes");
const environmentalRoutes = require("./routes/environmental.routes");
const hiraRoutes = require("./routes/hira.routes");
const eraRoutes = require("./routes/era.routes");
const legalRegisterRoutes = require("./routes/legalRegister.routes");
const coshhRegisterRoutes = require("./routes/coshhRegister.routes");

const app = express();
app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.enable("trust proxy");
// app.use((req, res, next) => {
//   req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

//Static content
app.use(
  "/public/files/equipment_certifications",
  express.static("public/files/equipment_certifications")
);
app.use(
  "/public/files/ncr_documents",
  express.static("public/files/ncr_documents")
);
app.use(
  "/public/files/audit_documents",
  express.static("public/files/audit_documents")
);
app.use(
  "/public/files/emergency_drill_attachments",
  express.static("public/files/emergency_drill_attachments")
);
app.use(
  "/public/files/coshh_documents",
  express.static("public/files/coshh_documents")
);

/**
 * Routes start
 */
app.get("/", async (req, res, next) => {
  res.send("Home Route");
});

/**
 * NCR Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/common", commonRoutes);
app.use("/api/ncr/records", ncrRecordRoutes);
app.use("/api/calibration/records", caliobrationRecordRoutes);
app.use("/api/survey", surveyRoutes);
app.use("/api/audits", auditRoutes);
app.use("/api/emergency-drills", emergencyDrillRoutes);
app.use("/api/eair", environmentalRoutes);
app.use("/api/hira", hiraRoutes);
app.use("/api/era", eraRoutes);
app.use("/api/legal-register", legalRegisterRoutes);
app.use("/api/coshh", coshhRegisterRoutes);
/**
 * NCR Routes End
 */

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      message: error.message || "Something went wrong!",
    },
  });
});

/**
 * Routes end
 */

module.exports = app;
