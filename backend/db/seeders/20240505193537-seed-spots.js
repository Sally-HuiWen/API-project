'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models');
const { Op } = require('sequelize');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('Running seeder: Spot');

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '171 Santa Rosa Avenue',
        city: 'Mountain View',
        state: 'CA',
        country: 'The United States',
        lat: '37.3957831',
        lng: '-122.0766539',
        name: 'Luxury Suite with private bath next to Downtown Mountain View',
        description: 'This clean and modern bedroom suite conveniently locates near tech companies, highways, stores, restaurants and San Jose Airport.',
        price: 110,
      },
      {
        ownerId: 2,
        address: '3877 El Camino Real',
        city: 'Palo Alto',
        state: 'CA',
        country: 'The United States',
        lat: '37.4175513',
        lng: '-122.1307371',
        name: "Stanford traveler's love Studio",
        description: 'Enjoy a stylish experience at this centrally-located place. Everything inside is new! Queen bed, private backyard with BBQ Grill',
        price: 120,
      },
    {
      ownerId: 3,
      address: '11537 Snowpeak Way',
      city: 'Truckee',
      state: 'CA',
      country: 'The United States',
      lat: '39.3549377',
      lng: '-120.2600683',
      name: "sweet resort ski in/ski out Tahoe Donner",
      description: 'Your home away from home located within the Tahoe Donner Downhill Ski resort gives you an easy access to many outdoor activities and ski in ski out',
      price: 260,
    }], {validate:true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {
      address: {[Op.in]: ['171 Santa Rosa Avenue', '3877 El Camino Real', '11537 Snowpeak Way']}
    }, {})
  }
};
