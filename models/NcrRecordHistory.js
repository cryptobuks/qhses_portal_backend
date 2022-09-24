"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NcrRecordHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.NcrRecord, {
        as: "record",
        foreignKey: "record_id",
      });
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id",
      });
      this.belongsTo(models.NcrStatus, {
        as: "status",
        foreignKey: "status_id",
      });
    }
  }
  NcrRecordHistory.init(
    {
      record_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "NcrRecordHistory",
      tableName: "qhses_ncr_record_history",
    }
  );
  return NcrRecordHistory;
};
