import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';
import { Users } from './users.model.js';

// Galleries attribute database schema
export const Students = db.define('students', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  nis: {
    type: DataTypes.STRING,
  },
  tmptLahir: {
    type: DataTypes.STRING,
  },
  jenisKel: {
    type: DataTypes.STRING,
  },
  agama: {
    type: DataTypes.STRING,
  },
  tglMasuk: {
    type: DataTypes.DATE,
  },
  namaAyah: {
    type: DataTypes.STRING,
  },
  pekerjaanAyah: {
    type: DataTypes.STRING,
  },
  noTelpAyah: {
    type: DataTypes.STRING,
  },
  namaIbu: {
    type: DataTypes.STRING,
  },
  pekerjaanIbu: {
    type: DataTypes.STRING,
  },
  noTelpIbu: {
    type: DataTypes.STRING,
  },
  namaWali: {
    type: DataTypes.STRING,
  },
  pekerjaanWali: {
    type: DataTypes.STRING,
  },
  noTelpWali: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  freezeTableName: true
});

// Define association between Teachers and Users
Students.belongsTo(Users, { foreignKey: 'userId' });
