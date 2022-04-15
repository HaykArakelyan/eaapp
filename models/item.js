'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init({
    id: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID
    },
    name: DataTypes.STRING,
    cost: DataTypes.STRING,
    productType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    orderId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Orders',
        key: 'id'
      }
    }

  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};