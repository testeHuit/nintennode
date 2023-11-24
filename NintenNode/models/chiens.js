'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chiens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chiens.init({
    idusers: DataTypes.INTEGER,
    name: DataTypes.STRING,
    race: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chiens',
  });
  return chiens;
};