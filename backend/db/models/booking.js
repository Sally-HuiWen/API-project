'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })

      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
     
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
        // isDate: true,
        // startDateMustBeTodayOrAfter(value) {
        //   if (!value) {
        //     throw new Error('Please select check-in date!')
        //   }
        //   const today = new Date().toISOString().slice(0,10);
        //   if (value < today) {
        //     throw new Error('The check-in date can not before today!')
        //   }
        // }
      // } 
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
        // isDate: true,
        // endDateMustBeAfterStartDate(value) {
        //   if(!value) {
        //     throw new Error ('Please select checkout date!')
        //   }

        //   if (!this.startDate) {
        //     throw new Error ('Please select check-in date!')
        //   }

        //   if (value <= this.startDate) {
        //     throw new Error('The checkout date must be after the check-in date!')
        //   }
        // }
      // }
    },

  
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};