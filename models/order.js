'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    id: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID
    },
    address: DataTypes.STRING,
    deliveredAt: DataTypes.DATE,
    customerId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Customers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Order'
  });
  return Order;
};