'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      candidateId: {
        allowNull: true,
        type: DataTypes.STRING
      },
      nama: {
        allowNull: true,
        type: DataTypes.STRING
      },
      jenis: {
        allowNull: false,
        type: DataTypes.STRING
      },
      ukuran: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Documents');
  }
};