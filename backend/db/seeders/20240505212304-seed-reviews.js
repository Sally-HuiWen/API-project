'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('Running seeder: Review');

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: 'wonderful place to stay!',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 3,
        review: 'It is cozy studio. However, it is not walking distance to Stanford!',
        stars: 4,
      },
      {
        spotId: 3,
        userId: 1,
        review: 'super convenient for skiing!',
        stars: 5,
      },
    ], )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {
      id: {[Op.in]: [1, 2, 3]}
    }, )
  }
};
