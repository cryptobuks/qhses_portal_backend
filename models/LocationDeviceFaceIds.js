"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LocationDeviceFaceIds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LocationDeviceFaceIds.init(
    {
      location_id: DataTypes.INTEGER,
      device_face_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "LocationDeviceFaceIds",
      tableName: "qhses_location_device_face_ids",
    }
  );
  return LocationDeviceFaceIds;
};
