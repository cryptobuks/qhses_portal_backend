"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.LocationDeviceFaceIds, {
        as: "locationFaceIds",
        foreignKey: "location_id",
      });
      this.belongsToMany(models.VFaceTerminalMaster, {
        as: "faceIds",
        foreignKey: "location_id",
        otherKey: "device_face_id",
        through: models.LocationDeviceFaceIds,
      });
    }
  }
  Location.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Location",
      tableName: "qhses_locations",
    }
  );
  return Location;
};
