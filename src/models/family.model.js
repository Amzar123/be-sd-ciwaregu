import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';
import { Candidate } from './candidate.model.js'; 

// Galleries attribute database schema
export const Family = db.define('families', {
    id: {
      allowNull: false,
      primaryKey: true,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING
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

// Define association between Teachers and Users
Family.belongsTo(Candidate, { 
  foreignKey: 'candidateId', 
  as: 'familyCandidate', 
  onDelete: 'CASCADE' 
});