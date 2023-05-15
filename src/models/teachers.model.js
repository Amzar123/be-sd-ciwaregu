import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';
import { Users } from './users.model.js';


// Galleries attribute database schema
export const Teachers = db.define('teachers', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  nuptk: {
    type: DataTypes.STRING,
  },
  nip: {
    type: DataTypes.STRING,
  },
  jenisKelamin: {
    type: DataTypes.STRING,
  },
  tempatLahir: {
    type: DataTypes.STRING,
  },
  tanggalLahir: {
    type: DataTypes.DATE,
  },
  jenisPTK: {
    type: DataTypes.STRING,
  },
  statusKepegawaian: {
    type: DataTypes.STRING,
  },
  gelarDepan: {
    type: DataTypes.STRING,
  },
  gelarBelakang: {
    type: DataTypes.STRING,
  },
  jenjang: {
    type: DataTypes.STRING,
  },
  jurusanProdi: {
    type: DataTypes.STRING,
  },
  sertifikasi: {
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
Teachers.belongsTo(Users, { foreignKey: 'userId', as: 'teachersDetail' });