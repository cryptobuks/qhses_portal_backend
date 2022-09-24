"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NcrArea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.NcrRecord, {
        foreignKey: "area_id",
      });
    }
  }
  NcrArea.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NcrArea",
      tableName: "qhses_ncr_areas",
    }
  );
  return NcrArea;
};
