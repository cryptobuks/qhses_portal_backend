"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NcrStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.NcrRecord, {
        foreignKey: "status_id",
      });
    }
  }
  NcrStatus.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NcrStatus",
      tableName: "qhses_ncr_statuses",
    }
  );
  return NcrStatus;
};
