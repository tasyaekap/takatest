'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactiondetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  transactiondetail.init({
    transactionId: {type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,},
    productId: DataTypes.INTEGER,
    productPrice: DataTypes.INTEGER,
    productAmmount: DataTypes.INTEGER,
    totalAmmount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transactiondetail',
  });
  return transactiondetail;
};