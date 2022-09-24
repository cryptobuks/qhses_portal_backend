"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NcrDistributor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.NcrRecord, {
        as: "ncrRecord",
        foreignKey: "ncr_record_id",
      });
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id",
      });
    }
  }
  NcrDistributor.init(
    {
      ncr_record_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      email_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NcrDistributor",
      tableName: "qhses_ncr_distributors",
    }
  );
  return NcrDistributor;
};
