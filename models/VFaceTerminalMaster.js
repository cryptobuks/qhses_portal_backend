"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VFaceTerminalMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VFaceTerminalMaster.init(
    {
      terminal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      terminal_desc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "VFaceTerminalMaster",
      tableName: "vw_face_terminal_master",
      timestamps: false,
    }
  );
  return VFaceTerminalMaster;
};
