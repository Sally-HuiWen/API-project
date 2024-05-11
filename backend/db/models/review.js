'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })

      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'cascade',
        hooks: true,
      })
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      // validate: {
      //   spotIdNotTheSameAsUserId(value) {
      //     if (value === this.userId) {
      //       throw new Error('You can not leave a review on your own property!')
      //     }
      //   }
      // }  
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,   
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 1000]
      }  
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      validate: {
        min: 1,
        max: 5,
        isInt: true,
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};