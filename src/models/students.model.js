import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';

// Galleries attribute database schema
export const Students = db.define('students', {
  studentsId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  nis: {
    type: DataTypes.STRING,
    allowNull:false
  },
  namaSiswa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tmptLahir: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tgllLahir: {
    type: DataTypes.DATE,
    allowNull: false
  },
  jenisKel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  agama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tglMasuk: {
    type: DataTypes.DATE,
    allowNull: false
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
