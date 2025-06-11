'use strict';

/** @type {import('sequelize-cli').Migration} */
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

    // у seed-файлі
    await queryInterface.bulkInsert('brands', [
      {
        name: 'Samsung',
        country: 'South Korea',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: 'Apple',
        country: 'USA',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: 'Xiaomi',
        country: 'China',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('brands', null, {});
  
  }
};
