"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quarter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Quarter.init(
    {
      quater_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Quater",
      tableName: "qhses_quaters",
    }
  );
  return Quarter;
};
