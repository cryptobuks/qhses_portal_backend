"use strict";
require("dotenv").config();
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NcrRecordDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "uploadedBy",
        foreignKey: "uploaded_by",
      });
    }
  }
  NcrRecordDocument.init(
    {
      ncr_record_id: DataTypes.INTEGER,
      ncr_corrective_action_plan_id: DataTypes.INTEGER,
      uploaded_by: DataTypes.INTEGER,
      document_name: DataTypes.STRING,
      document_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${process.env.BASE_URL}/public/files/ncr_documents/${this.document_name}`;
        },
        set(value) {
          throw new Error("Do not try to set the `documentUrl` value!");
        },
      },
    },
    {
      sequelize,
      modelName: "NcrRecordDocument",
      tableName: "qhses_ncr_record_documents",
    }
  );
  return NcrRecordDocument;
};
