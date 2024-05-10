'use strict';
/** @type {import('sequelize-cli').Migration} */
const { User } = require('../models');
const bcrypt = require('bcryptjs');
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
    await User.bulkCreate([
      {
        firstName: 'Demo',
        lastName: 'One',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'), 
      },
      {
        firstName: 'Fake',
        lastName: 'Two',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Untrue',
        lastName: 'Three',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      }

    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, {
      username: {[Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2']}
    }, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
