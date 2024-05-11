'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Booking } = require('../models');
const { Op } = require('sequelize');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('Running seeder: Booking');

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Booking.bulkCreate([
      {
        spotId: 1 ,
        userId: 2,
        startDate: '2024-08-01',
        endDate: '2024-08-02',

      },
      {
        spotId: 2 ,
        userId: 3,
        startDate: '2024-08-11',
        endDate: '2024-08-15',

      },
      {
        spotId: 3 ,
        userId: 1,
        startDate: '2024-08-21',
        endDate: '2024-08-28',
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
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, {
      id: {[Op.in]: [1, 2, 3]}
    }, {})
  }
};
