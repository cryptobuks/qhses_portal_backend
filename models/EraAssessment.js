"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EraAssessment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id",
      });
      this.belongsTo(models.User, {
        as: "lastUpdateBy",
        foreignKey: "last_update_by_user_id",
      });
      this.belongsTo(models.Company, {
        as: "company",
        foreignKey: "company_id",
      });
      this.belongsTo(models.EraLikelihood, {
        as: "likelihood",
        foreignKey: "likelihood_id",
      });
      this.belongsTo(models.EraConsequence, {
        as: "consequence",
        foreignKey: "consequence_id",
      });
      this.belongsTo(models.EraLikelihood, {
        as: "residualLikelihood",
        foreignKey: "residual_likelihood_id",
      });
      this.belongsTo(models.EraConsequence, {
        as: "residualConsequence",
        foreignKey: "residual_consequence_id",
      });
      this.belongsTo(models.EraAction, {
        as: "action",
        foreignKey: "action_id",
      });
      this.belongsTo(models.EraStatus, {
        as: "status",
        foreignKey: "status_id",
      });
    }
  }
  EraAssessment.init(
    {
      user_id: DataTypes.INTEGER,
      last_update_by_user_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
      date_raised: DataTypes.DATE,
      risk_type: DataTypes.STRING,
      risk_area: DataTypes.STRING,
      event: DataTypes.STRING,
      cause: DataTypes.STRING,
      consequences: DataTypes.TEXT,
      likelihood_id: DataTypes.INTEGER,
      consequence_id: DataTypes.INTEGER,
      action_id: DataTypes.INTEGER,
      plan: DataTypes.TEXT,
      residual_likelihood_id: DataTypes.INTEGER,
      residual_consequence_id: DataTypes.INTEGER,
      methods: DataTypes.TEXT,
      progress_reporting: DataTypes.TEXT,
      responsible: DataTypes.TEXT,
      status_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EraAssessment",
      tableName: "qhses_era_assessments",
    }
  );
  return EraAssessment;
};
