'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'http://localhost:8000/images/review-image-1.jpeg',
      },
      {
        reviewId: 2,
        url: 'http://localhost:8000/images/review-image-2.jpeg',

      },
      {
        reviewId: 3,
        url: 'http://localhost:8000/images/review-image-1.jpeg',
      },
    ], )//remove {validate: true}
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options, {
      id: {[Op.in]: [1, 2, 3]}
    }, )
  }
};
