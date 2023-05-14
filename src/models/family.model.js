import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';

// Galleries attribute database schema
export const Family = db.define('Families', {
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
}, {
    freezeTableName: true
});
