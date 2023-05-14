'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  await queryInterface.createTable('Guardians', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING
    },
    candidateId: {
      allowNull: true,
      type: Sequelize.STRING
    },
    nama: {
      allowNull: true,
      type: Sequelize.STRING
    },
    pendidikan: {
      allowNull: false,
      type: Sequelize.STRING
    },
    pekerjaan: {
      allowNull: false,
      type: Sequelize.STRING
    },
    penghasilan: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
  await queryInterface.dropTable('Guardians');
}
