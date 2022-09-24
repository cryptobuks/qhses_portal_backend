"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmergencyDrillAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmergencyDrillAttachment.init(
    {
      emergency_drill_id: DataTypes.INTEGER,
      attachment_name: DataTypes.STRING,
      attachment_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${process.env.BASE_URL}/public/files/emergency_drill_attachments/${this.attachment_name}`;
        },
        set(value) {
          throw new Error("Do not try to set the `AttachmentUrl` value!");
        },
      },
    },
    {
      sequelize,
      modelName: "EmergencyDrillAttachment",
      tableName: "qhses_emergency_drill_attachments",
    }
  );
  return EmergencyDrillAttachment;
};
