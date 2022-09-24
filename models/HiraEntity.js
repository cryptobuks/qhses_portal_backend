"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HiraEntity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HiraEntity.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HiraEntity",
      tableName: "qhses_hira_entities",
    }
  );
  return HiraEntity;
};
