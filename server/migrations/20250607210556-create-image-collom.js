'use strict';

/** @type {import('sequelize-cli').Migration} */
/**
 * Add altering commands here.
 *
 * Example:
 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('phones', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('phones', 'image');
  },
};
