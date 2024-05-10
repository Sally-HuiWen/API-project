'use strict';
/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');
const { Op } = require('sequelize');
const path = require('path');

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
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'spotImage1',
        preview: true

      },
      {
        spotId: 2,
        url: 'spotImage2',
        preview: true
      },
      {
        spotId: 3,
        url: 'spotImage3',
        preview: true

      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {
      id: {[Op.in]: [1, 2, 3]}
    }, )
  }
};
