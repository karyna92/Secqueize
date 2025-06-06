'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Phone.belongsTo(models.Brand, {
        foreignKey: 'brandId',
      });
    }
  }
  Phone.init(
    {
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'brands',
          key: 'id',
        },
      },   
      year: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString().split('T')[0],
        },
      },
      ram: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          isInt: true,
        },
      },
      cpu: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      displaySize: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'display_size',
        validate: {
          min: 0.1,
          isFloat: true,
        },
      },
      hasNFC: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'has_nfc',
      },
    },
    {
      sequelize,
      modelName: 'Phone',
      tableName: 'phones',
      underscored: true,
    }
  );
  return Phone;
};