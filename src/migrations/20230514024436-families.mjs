/** @type {import('sequelize-cli').Migration} */
import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  await queryInterface.createTable('Families', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    candidateId: {
      allowNull: true,
      type: DataTypes.STRING
    },
    namaAyah: {
      allowNull: true,
      type: DataTypes.STRING
    },
    pendidikanAyah: {
      allowNull: false,
      type: DataTypes.STRING
    },
    pekerjaanAyah: {
      allowNull: false,
      type: DataTypes.STRING
    },
    penghasilanAyah: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    namaIbu: {
      allowNull: false,
      type: DataTypes.STRING
    },
    pendidikanIbu: {
      allowNull: false,
      type: DataTypes.STRING
    },
    pekerjaanIbu: {
      type: DataTypes.STRING
    },
    penghasilanIbu: {
      allowNull: false,
      type: DataTypes.INTEGER
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
}

export async function down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
  await queryInterface.dropTable('Families');
}
