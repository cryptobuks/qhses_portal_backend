const moment = require("moment");
const dateFormat = "YYYY-MM-DD";

const ncrCreatedTemplate = (name, link) => {
  return `<p>Hi ${name},</p>
        <p>You have created an NCR.</p>
        <p>You can view the NCR detail by clicking on the link below.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>NCR Detail</a>
        </div>
    <p>Regards,</p>
    `;
};

const ncrOwnerTemplate = (name, link) => {
  return `<p>Hi ${name},</p>
        <p>You have been added as an NCR Owner.</p>
        <p>You can view the NCR detail by clicking on the link below.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>NCR Detail</a>
        </div>
    <p>Regards,</p>
    `;
};

const actionPlanAddedTemplateToCreator = (name, link) => {
  return `<p>Hi ${name},</p>
        <p>Action Plan has been added against the NCR</p>
        <p>You can view the NCR detail by clicking on the link below.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>NCR Detail</a>
        </div>
    <p>Regards,</p>
    `;
};
const actionPlanAddedTemplateToOwer = (name, link) => {
  return `<p>Hi ${name},</p>
        <p>Action Plan has been added against the NCR</p>
        <p>You can view the NCR detail by clicking on the link below.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>NCR Detail</a>
        </div>
    <p>Regards,</p>
    `;
};

const actionPlanAddedTemplateToResponsible = (name, link) => {
  return `<p>Hi ${name},</p>
        <p>You have been assigned as a responsible person in an NCR action plan.</p>
        <p>You can view the NCR detail by clicking on the link below.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>NCR Detail</a>
        </div>
    <p>Regards,</p>
    `;
};

const distributorTemplate = (name, link) => {
  return `<p>Hi ${name},</p>
        <p>You have been added as a distributor to an NCR.</p>
        <p>You can view the NCR detail by clicking on the link below.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>NCR Detail</a>
        </div>
    <p>Regards,</p>
    `;
};
const actionPlanClosedTemplateToCreator = (name, link) => {
  return `<p>Hi ${name},</p>
        <p>An action plan has been closed.</p>
        <p>You can view the NCR detail by clicking on the link below.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>NCR Detail</a>
        </div>
    <p>Regards,</p>
    `;
};
const actionPlanClosedTemplateToOwner = (name, link) => {
  return `<p>Hi ${name},</p>
  <p>An action plan has been closed.</p>
        <p>You can view the NCR detail by clicking on the link below.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>NCR Detail</a>
        </div>
    <p>Regards,</p>
    `;
};
const actionPlanOverDueTemplate = (name, targetDate, link) => {
  return `<p>Hi ${name},</p>
  <p>An action plan against NCR is over due, please close your action plan.</p>
        <p>You can view the NCR detail by clicking on the link below.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>NCR Detail</a>
        </div>
    <p>Regards,</p>
    `;
};
const actionPlanDaysTemplate = (name, targetDate, days, link) => {
  return `<p>Hi ${name},</p>
  <p>An action plan against NCR is due in ${days} days, please close your action plan.</p>
        <p>You can view the NCR detail by clicking on the link below.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>NCR Detail</a>
        </div>
    <p>Regards,</p>
    `;
};

const ncrReviseTemplateToOwner = (name, link) => {
  return `<p>Hi ${name},</p>
          <p>An NCR have been marked as <Strong>Not Satisfactory</Strong>.</p>
          <p>You can view the NCR detail by clicking on the link below.</p>
          <div>
              <a href="${link}" style=''color: #1DA57A;''>NCR Detail</a>
          </div>
      <p>Regards,</p>
      `;
};

const calibrationRecordAddedTemplate = (name, link) => {
  return `<p>Hi ${name},</p>
          <p>You have created a new record.</p>
          <p>You can view the detail by clicking on the link below.</p>
          <div>
              <a href="${link}" style=''color: #1DA57A;''>Calibration Detail</a>
          </div>
      <p>Regards,</p>
      `;
};
const calibrationRecordAddedTemplateToOwner = (name, link) => {
  return `<p>Hi ${name},</p>
          <p>You have been added as a Calibration Owner.</p>
          <p>You can view the detail by clicking on the link below.</p>
          <div>
              <a href="${link}" style=''color: #1DA57A;''>Calibration Detail</a>
          </div>
      <p>Regards,</p>
      `;
};
const calibrationRecordUpdatedTemplate = (name, link) => {
  return `<p>Hi ${name},</p>
        <p>You have updated record.</p>
          <p>You can view the detail by clicking on the link below.</p>
          <div>
              <a href="${link}" style=''color: #1DA57A;''>Calibration Detail</a>
          </div>
        <p>Regards,</p>
      `;
};
const calibrationRecordUpdatedTemplateToOwner = (name, link) => {
  return `<p>Hi ${name},</p>
        <p>Caliration Record has been updated.</p>
          <p>You can view the detail by clicking on the link below.</p>
          <div>
              <a href="${link}" style=''color: #1DA57A;''>Calibration Detail</a>
          </div>
        <p>Regards,</p>
      `;
};
const calibrationDaysTemplate = (name, days, link) => {
  return `<p>Hi ${name},</p>
    <p>A equipment calibration is due in ${days} days, please update the calibration record.</p>
        <p>You can view the detail by clicking on the link below.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>Calibration Detail</a>
        </div>
    <p>Regards,</p>
    `;
};
const calibrationOverDueTemplate = (name, link) => {
  return `<p>Hi ${name},</p>
    <p>A equipment calibration is over due, please update the calibration record.</p>
        <p>You can view the detail by clicking on the link below.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>Calibration Detail</a>
        </div>
    <p>Regards,</p>
    `;
};

const assignSurveyToUserTemplate = (name, link) => {
  return `<p>Hi ${name},</p>
    <p>You have been asked to complete a customer survey.</p>
        <p>Click on the link below to checkout the details.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>Survey Detail</a>
        </div>
    <p>Regards,</p>
    `;
};

const receiveFeedbackOnSurveyTemplate = (name, feedbackByName, link) => {
  return `<p>Hi ${name},</p>
    <p>${feedbackByName} just gave feedback on a survey you created.</p>
        <p>Click on the link below to checkout the details.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>Feedback Detail</a>
            </div>
            <p>Regards,</p>
            `;
};

const auditCreatedTemplate = (toUserName, auditInfo, link) => {
  return `<p>Hi ${toUserName},</p>
    <p>You have created an audit.</p>
    <ul>
            <li>Month: ${auditInfo.month.name} ${auditInfo.year.year}</li>
            <li>Company/Department: ${
              auditInfo.company ? `${auditInfo.company.name} (Company)` : ""
            } ${
    auditInfo.department ? `${auditInfo.department.name} (Department)` : ""
  }</li>
        </ul>
        <p>Click on the link below to see the details.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>Audit Detail</a>
        </div>
    <p>Regards,</p>
    `;
};

// ${
//   auditInfo &&
//   auditInfo.notification &&
//   `<li>Date: ${moment(
//     auditInfo.notification.audit_from_date
//   ).format(dateFormat)} to ${
//     auditInfo &&
//     auditInfo.notification &&
//     moment(auditInfo.notification.audit_to_date).format(dateFormat)
//   }</li>`
// }


const auditAuditorTemplate = (toUserName, auditInfo, link) => {
  return `<p>Hi ${toUserName},</p>
    <p>You have been added as an Auditor for a audit.</p>
        <ul>
            <li>Month: ${auditInfo.month.name} ${auditInfo.year.year}</li>
            <li>Location/Area: ${
              auditInfo.company ? `${auditInfo.company.name} (Company)` : ""
            } ${
    auditInfo.department ? `${auditInfo.department.name} (Department)` : ""
  }</li>
            ${
              auditInfo &&
              auditInfo.notification &&
              `<li>Date: ${moment(
                auditInfo.notification.audit_from_date
              ).format(dateFormat)} to ${
                auditInfo &&
                auditInfo.notification &&
                moment(auditInfo.notification.audit_to_date).format(dateFormat)
              }</li>`
            }
        </ul>
        <p>Click on the link below to checkout the details.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>Audit Detail</a>
        </div>
    <p>Regards,</p>
    `;
};
const auditAuditeeTemplate = (toUserName, auditInfo, link) => {
  return `<p>Hi ${toUserName},</p>
    <p>An Audit has been scheduled.</p>
        <ul>
            <li>Month: ${auditInfo.month.name} ${auditInfo.year.year}</li>
            <li>Location/Area: ${
              auditInfo.company ? `${auditInfo.company.name} (Company)` : ""
            } ${
    auditInfo.department ? `${auditInfo.department.name} (Department)` : ""
  }</li>
            ${
              auditInfo &&
              auditInfo.notification &&
              `<li>Date: ${moment(
                auditInfo.notification.audit_from_date
              ).format(dateFormat)} to ${
                auditInfo &&
                auditInfo.notification &&
                moment(auditInfo.notification.audit_to_date).format(dateFormat)
              }</li>`
            }
        </ul>
        <p>Click on the link below to checkout the details.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>Audit Detail</a>
        </div>
    <p>Regards,</p>
    `;
};

const auditCreatorReminderTemplate = (toUserName, auditInfo, link) => {
  return `<p>Hi ${toUserName},</p>
      <p>An Audit is schedule.</p>
        <ul>
            <li>Month: ${auditInfo.month.name} ${auditInfo.year.year}</li>
            <li>Location/Area: ${
              auditInfo.company ? `${auditInfo.company.name} (Company)` : ""
            } ${
    auditInfo.department ? `${auditInfo.department.name} (Department)` : ""
  }</li>
            ${
              auditInfo &&
              auditInfo.notification &&
              `<li>Date: ${moment(
                auditInfo.notification.audit_from_date
              ).format(dateFormat)} to ${
                auditInfo &&
                auditInfo.notification &&
                moment(auditInfo.notification.audit_to_date).format(dateFormat)
              }</li>`
            }
        </ul>
          <p>Click on the link below to checkout the details.</p>
          <div>
              <a href="${link}" style=''color: #1DA57A;''>Audit Detail</a>
          </div>
      <p>Regards,</p>
      `;
};
const auditCreatorOverDueReminderTemplate = (toUserName, auditInfo, link) => {
  return `<p>Hi ${toUserName},</p>
      <p>Audit has been overdue.</p>
        <ul>
            <li>Month: ${auditInfo.month.name} ${auditInfo.year.year}</li>
            <li>Location/Area: ${
              auditInfo.company ? `${auditInfo.company.name} (Company)` : ""
            } ${
    auditInfo.department ? `${auditInfo.department.name} (Department)` : ""
  }</li>
            ${
              auditInfo &&
              auditInfo.notification &&
              `<li>Date: ${moment(
                auditInfo.notification.audit_from_date
              ).format(dateFormat)} to ${
                auditInfo &&
                auditInfo.notification &&
                moment(auditInfo.notification.audit_to_date).format(dateFormat)
              }</li>`
            }
        </ul>
          <p>Click on the link below to checkout the details.</p>
          <div>
              <a href="${link}" style=''color: #1DA57A;''>Audit Detail</a>
          </div>
      <p>Regards,</p>
      `;
};

const drillCreatedTemplate = (toUserName, drillInfo, link) => {
  return `<p>Hi ${toUserName},</p>
    <p>You have scheduled a emergency drill.</p>
    <ul>
            <li>Month: ${drillInfo.month.name} ${drillInfo.year.year}</li>
            <li>Drill Type: ${drillInfo.type.name}</li>
            <li>Location/Facility: ${
              drillInfo.locations
                ? drillInfo.locations.map((location) => `${location.name} `)
                : "N/A"
            }</li>
            ${
              drillInfo &&
              `<li>Shift Time: ${
                drillInfo &&
                `${moment(drillInfo.shift_date_time).format(
                  "YYYY-MM-DD hh:mm A"
                )}`
              }</li>`
            }
        </ul>
        <p>Click on the link below to checkout the details.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>Drill Detail</a>
        </div>
    <p>Regards,</p>
    `;
};
const drillNotificationToEmailTemplate = (toUserName, drillInfo, link) => {
  return `<p>Hi ${toUserName},</p>
    <p>A new emergency drill has been scheduled.</p>
    <ul>
            <li>Month: ${drillInfo.month.name} ${drillInfo.year.year}</li>
            <li>Drill Type: ${drillInfo.type.name}</li>
            <li>Location / Facility: ${
              drillInfo.locations
                ? drillInfo.locations.map((location) => `${location.name} `)
                : "N/A"
            }</li>
            ${
              drillInfo &&
              `<li>Shift Time: ${
                drillInfo &&
                `${moment(drillInfo.shift_date_time).format(
                  "YYYY-MM-DD hh:mm A"
                )}`
              }</li>`
            }
        </ul>
        <p>Click on the link below to checkout the details.</p>
        <div>
            <a href="${link}" style=''color: #1DA57A;''>Drill Detail</a>
        </div>
    <p>Regards,</p>
    `;
};

module.exports = {
  ncrCreatedTemplate,
  ncrOwnerTemplate,
  actionPlanAddedTemplateToCreator,
  actionPlanAddedTemplateToOwer,
  actionPlanAddedTemplateToResponsible,
  distributorTemplate,
  actionPlanClosedTemplateToCreator,
  actionPlanClosedTemplateToOwner,
  actionPlanOverDueTemplate,
  actionPlanDaysTemplate,
  ncrReviseTemplateToOwner,

  calibrationRecordAddedTemplate,
  calibrationRecordAddedTemplateToOwner,
  calibrationRecordUpdatedTemplate,
  calibrationRecordUpdatedTemplateToOwner,

  calibrationDaysTemplate,
  calibrationOverDueTemplate,

  assignSurveyToUserTemplate,
  receiveFeedbackOnSurveyTemplate,

  auditCreatedTemplate,
  auditAuditorTemplate,
  auditAuditeeTemplate,
  auditCreatorReminderTemplate,
  auditCreatorOverDueReminderTemplate,

  drillCreatedTemplate,
  drillNotificationToEmailTemplate,
};
